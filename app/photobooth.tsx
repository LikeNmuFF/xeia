import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Camera as CameraIcon, X, Check, RotateCcw } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { addToQueue, processQueue } from '../lib/uploadQueue';
import { FILE_PATHS } from '../lib/storage';
import { Button, Loading, EmptyState } from '../components';
import { colors, typography, spacing, borderRadius } from '../lib/theme';
import { TULIP_LOVE_TEMPLATE } from '../lib/collageTemplates';
import Animated, { FadeIn, FadeOut, useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOTAL_TAKES = 4;
const COLLAGE_PADDING = 12;
const COLLAGE_HEADER_HEIGHT = 50;
const COLLAGE_FOOTER_HEIGHT = 36;
const COLLAGE_GRID_GAP = 8;
const PHOTO_SIZE = (SCREEN_WIDTH - 32 * 2 - COLLAGE_PADDING * 2 - COLLAGE_GRID_GAP) / 2;

type Phase = 'camera' | 'countdown' | 'flash' | 'review';

export default function PhotoboothScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const collageRef = useRef<View>(null);

  const [phase, setPhase] = useState<Phase>('camera');
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentTake, setCurrentTake] = useState(1);
  const [countdown, setCountdown] = useState(3);
  const [capturing, setCapturing] = useState(false);
  const [saving, setSaving] = useState(false);

  const flashOpacity = useSharedValue(0);
  const flashStyle = useAnimatedStyle(() => ({
    opacity: flashOpacity.value,
  }));

  useEffect(() => {
    requestPermission();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (phase !== 'countdown') return;

    if (countdown === 0) {
      capturePhoto();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, countdown]);

  const startCapture = () => {
    setCountdown(3);
    setPhase('countdown');
  };

  const capturePhoto = async () => {
    if (!cameraRef.current || capturing) return;
    setCapturing(true);
    setPhase('flash');

    // Flash effect
    flashOpacity.value = withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(0, { duration: 200 })
    );

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.85,
        base64: false,
        exif: false,
      });

      const newPhotos = [...photos, photo.uri];
      setPhotos(newPhotos);

      if (newPhotos.length < TOTAL_TAKES) {
        setCurrentTake(currentTake + 1);
        setTimeout(() => {
          setCountdown(3);
          setPhase('countdown');
        }, 400);
      } else {
        setPhase('review');
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture');
      setPhase('camera');
    } finally {
      setCapturing(false);
    }
  };

  const retakeAll = () => {
    setPhotos([]);
    setCurrentTake(1);
    setPhase('camera');
  };

  const saveCollage = async () => {
    if (!collageRef.current || photos.length < TOTAL_TAKES) return;
    setSaving(true);

    try {
      const uri = await captureRef(collageRef.current, {
        format: 'jpg',
        quality: 0.9,
      });

      const timestamp = Date.now();
      const filename = `collage_${timestamp}.jpg`;
      const localPath = FILE_PATHS.PHOTOBOOTH_IMAGES + filename;

      await FileSystem.copyAsync({ from: uri, to: localPath });
      await addToQueue(localPath, filename, 'photobooth', `Collage from ${new Date().toLocaleDateString()}`);
      await processQueue();

      Alert.alert('Saved!', 'Your collage will upload when online.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error saving collage:', error);
      Alert.alert('Error', 'Failed to save collage');
    } finally {
      setSaving(false);
    }
  };

  if (!permission) {
    return (
      <LinearGradient colors={[colors.background, colors.backgroundTertiary]} style={styles.centerContainer}>
        <Loading type="spinner" text="Requesting camera permission..." />
      </LinearGradient>
    );
  }

  if (!permission.granted) {
    return (
      <LinearGradient colors={[colors.background, colors.backgroundTertiary]} style={styles.centerContainer}>
        <EmptyState
          type="error"
          title="Camera Permission Required"
          description="Camera permission is required to use the photobooth"
          actionText="Request Permission"
          onActionPress={requestPermission}
        />
      </LinearGradient>
    );
  }

  // Collage review screen
  if (phase === 'review') {
    return (
      <View style={styles.container}>
        <LinearGradient colors={[colors.background, colors.backgroundTertiary]} style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>Your Collage</Text>

          <View style={styles.collageWrapper}>
            <View ref={collageRef} style={styles.collage} collapsable={false}>
              {/* Header */}
              <View style={styles.collageHeader}>
                <Text style={styles.collageHeaderText}>{TULIP_LOVE_TEMPLATE.header}</Text>
              </View>

              {/* Photo grid */}
              <View style={styles.collageGrid}>
                {photos.map((uri, index) => (
                  <View key={index} style={styles.collageSlot}>
                    <Image source={{ uri }} style={styles.collageImage} />
                  </View>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.collageFooter}>
                <Text style={styles.collageFooterText}>
                  {TULIP_LOVE_TEMPLATE.footer(new Date())}
                </Text>
              </View>

              {/* Heart accents */}
              <View style={[styles.heartAccent, styles.heartTL]} />
              <View style={[styles.heartAccent, styles.heartTR]} />
              <View style={[styles.heartAccent, styles.heartBL]} />
              <View style={[styles.heartAccent, styles.heartBR]} />
            </View>
          </View>

          <View style={styles.reviewActions}>
            <Button
              variant="secondary"
              size="lg"
              onPress={retakeAll}
              leftIcon={<RotateCcw size={20} color={colors.foreground} />}
            >
              Retake
            </Button>

            <Button
              variant="primary"
              size="lg"
              onPress={saveCollage}
              disabled={saving}
              leftIcon={<Check size={20} color={colors.foreground} />}
              glow
            >
              {saving ? 'Saving...' : 'Save Collage'}
            </Button>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Camera + countdown screen
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="front" ref={cameraRef}>
        <View style={styles.cameraOverlay}>
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.6)']}
            style={styles.gradientOverlay}
          >
            {/* Take counter */}
            <View style={styles.counterBadge}>
              <Text style={styles.counterText}>
                {currentTake} / {TOTAL_TAKES}
              </Text>
            </View>

            {/* Camera frame */}
            <View style={styles.cameraFrame}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </View>

            {/* Countdown overlay */}
            {phase === 'countdown' && (
              <Animated.View
                key={countdown}
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={styles.countdownContainer}
              >
                <Text style={styles.countdownText}>{countdown}</Text>
              </Animated.View>
            )}

            {/* Flash overlay */}
            <Animated.View style={[styles.flashOverlay, flashStyle]} />

            {/* Capture button */}
            <Button
              variant="primary"
              size="xl"
              onPress={startCapture}
              disabled={capturing || phase === 'countdown'}
              style={styles.captureButton}
              glow
            >
              <CameraIcon size={32} color={colors.foreground} />
            </Button>

            {/* Photo thumbnails */}
            <View style={styles.thumbnailRow}>
              {Array.from({ length: TOTAL_TAKES }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.thumbnail,
                    index < photos.length && styles.thumbnailFilled,
                  ]}
                >
                  {index < photos.length && (
                    <Image source={{ uri: photos[index] }} style={styles.thumbnailImage} />
                  )}
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.xl,
  },
  // Counter
  counterBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.tulipPink,
  },
  counterText: {
    color: colors.cream,
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
  },
  // Frame
  cameraFrame: {
    width: '80%',
    height: '55%',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: colors.tulipPink,
  },
  cornerTL: {
    top: 0, left: 0,
    borderTopWidth: 3, borderLeftWidth: 3,
    borderTopLeftRadius: borderRadius.lg,
  },
  cornerTR: {
    top: 0, right: 0,
    borderTopWidth: 3, borderRightWidth: 3,
    borderTopRightRadius: borderRadius.lg,
  },
  cornerBL: {
    bottom: 0, left: 0,
    borderBottomWidth: 3, borderLeftWidth: 3,
    borderBottomLeftRadius: borderRadius.lg,
  },
  cornerBR: {
    bottom: 0, right: 0,
    borderBottomWidth: 3, borderRightWidth: 3,
    borderBottomRightRadius: borderRadius.lg,
  },
  // Countdown
  countdownContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  countdownText: {
    fontSize: 96,
    fontWeight: 'bold',
    color: colors.tulipYellow,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  // Flash
  flashOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'white',
  },
  // Capture
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  // Thumbnails
  thumbnailRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.neutral[600],
    overflow: 'hidden',
  },
  thumbnailFilled: {
    borderColor: colors.tulipPink,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  // Review
  reviewContainer: {
    flex: 1,
    padding: spacing.xl,
    paddingTop: 60,
    alignItems: 'center',
  },
  reviewTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.cream,
    marginBottom: spacing.lg,
  },
  collageWrapper: {
    width: SCREEN_WIDTH - spacing.xl * 2,
    aspectRatio: 1,
    marginBottom: spacing.xl,
  },
  collage: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    borderWidth: 3,
    borderColor: colors.tulipPink,
    overflow: 'hidden',
    padding: COLLAGE_PADDING,
  },
  collageHeader: {
    height: COLLAGE_HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collageHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.cream,
    letterSpacing: 1,
  },
  collageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  collageSlot: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    backgroundColor: colors.neutral[800],
  },
  collageImage: {
    width: '100%',
    height: '100%',
  },
  collageFooter: {
    height: COLLAGE_FOOTER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collageFooterText: {
    fontSize: 14,
    color: colors.tulipYellow,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  heartAccent: {
    position: 'absolute',
    width: 12,
    height: 12,
  },
  heartTL: { top: 6, left: 6 },
  heartTR: { top: 6, right: 6 },
  heartBL: { bottom: 6, left: 6 },
  heartBR: { bottom: 6, right: 6 },
  reviewActions: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
});

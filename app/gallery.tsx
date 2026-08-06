import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Images } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { getCachedData, syncGallery } from '../lib/storage';
import { CACHE_KEYS } from '../lib/storage';
import { Button, Card, Loading, EmptyState } from '../components';
import { colors, typography, spacing, borderRadius, shadows } from '../lib/theme';

interface GalleryItem {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl?: string;
  caption: string;
  type: 'gallery' | 'photobooth';
  createdAt: string;
}

export default function GalleryScreen() {
  const router = useRouter();
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    setLoading(true);
    try {
      let data = await getCachedData(CACHE_KEYS.GALLERY);
      if (!data || data.length === 0) {
        data = getFallbackGallery();
      }
      data.sort((a: GalleryItem, b: GalleryItem) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setImages(data);
    } catch (error) {
      console.error('Error loading gallery:', error);
      setImages(getFallbackGallery());
    } finally {
      setLoading(false);
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await syncGallery();
      await loadGallery();
    } catch (error) {
      console.error('Error refreshing gallery:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getFallbackGallery = (): GalleryItem[] => [
    { id: '1', filename: 'first-date.jpg', url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop', thumbnailUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&h=200&fit=crop', caption: 'Our first date - July 24, 2025', type: 'gallery', createdAt: '2025-07-24T19:00:00' },
    { id: '2', filename: 'first-kiss.jpg', url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop', thumbnailUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=200&h=200&fit=crop', caption: 'First kiss under the stars', type: 'gallery', createdAt: '2025-08-02T21:30:00' },
    { id: '3', filename: 'mountain-trip.jpg', url: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5?w=400&h=400&fit=crop', thumbnailUrl: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5?w=200&h=200&fit=crop', caption: 'Our first trip together', type: 'gallery', createdAt: '2025-10-15T12:00:00' },
    { id: '4', filename: 'thanksgiving.jpg', url: 'https://images.unsplash.com/photo-1519412659092-378457253339?w=400&h=400&fit=crop', thumbnailUrl: 'https://images.unsplash.com/photo-1519412659092-378457253339?w=200&h=200&fit=crop', caption: 'Meeting the family', type: 'gallery', createdAt: '2025-11-22T18:00:00' },
    { id: '5', filename: '6-months.jpg', url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop', thumbnailUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=200&h=200&fit=crop', caption: '6 months celebration', type: 'gallery', createdAt: '2026-01-24T20:00:00' },
    { id: '6', filename: 'moving-day.jpg', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop', caption: 'Moving in together!', type: 'gallery', createdAt: '2026-03-01T10:00:00' },
  ];

  const addNewPhoto = () => {
    router.push('/photobooth');
  };

  if (loading) {
    return (
      <LinearGradient colors={[colors.background, colors.backgroundTertiary]} style={styles.centerContainer}>
        <Loading type="heartbeat" text="Loading gallery..." />
      </LinearGradient>
    );
  }

  if (images.length === 0) {
    return (
      <LinearGradient colors={[colors.background, colors.backgroundTertiary]} style={styles.centerContainer}>
        <EmptyState type="gallery" onActionPress={addNewPhoto} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundTertiary]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.lovePrimary}
          />
        }
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100, duration: 600 }}
        >
          <Text style={styles.title}>Photo Gallery</Text>
          <Text style={styles.subtitle}>Our beautiful memories together</Text>
        </MotiView>

        <View style={styles.gallery}>
          {images.map((image, index) => (
            <MotiView
              key={image.id}
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 200 + index * 100, duration: 500 }}
              style={styles.imageWrapper}
            >
              <Card variant="elevated" size="sm" style={styles.imageContainer}>
                <Image
                  source={{ uri: image.thumbnailUrl || image.url }}
                  style={styles.image}
                />
                {image.caption ? (
                  <View style={styles.captionContainer}>
                    <Text style={styles.caption}>{image.caption}</Text>
                  </View>
                ) : null}
              </Card>
            </MotiView>
          ))}
        </View>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 600, duration: 500 }}
        >
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onPress={addNewPhoto}
            leftIcon={<Images size={24} color={colors.foreground} />}
            glow
          >
            Add New Photo
          </Button>
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: spacing.xl,
    paddingTop: 80,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.foregroundTertiary,
    marginBottom: spacing.xl,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  imageWrapper: {
    width: '47%',
  },
  imageContainer: {
    aspectRatio: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: spacing.sm,
    borderBottomLeftRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.lg,
  },
  caption: {
    fontSize: typography.fontSize.xs,
    color: colors.foreground,
  },
});

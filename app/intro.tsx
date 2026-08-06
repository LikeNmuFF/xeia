import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { colors, spacing } from '../lib/theme';
import { Button } from '../components/Button';

export default function IntroScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundTertiary]}
      style={styles.container}
    >
      <View style={styles.glowOrb} />

      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 200 }}
        style={styles.heartContainer}
      >
        <Heart size={80} color={colors.lovePrimary} />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 400, duration: 600 }}
      >
        <Text style={styles.title}>Welcome to Xeia</Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 600, duration: 600 }}
      >
        <Text style={styles.description}>
          A celebration of 18 beautiful months together.
          {'\n\n'}
          Swipe through our journey, measure our love,
          and relive the memories that made us who we are.
        </Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 800, duration: 600 }}
        style={styles.buttonContainer}
      >
        <Button
          variant="primary"
          size="xl"
          fullWidth
          glow
          onPress={() => router.replace('/home')}
        >
          Begin Our Story
        </Button>
      </MotiView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  glowOrb: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.lovePrimary,
    opacity: 0.08,
    top: '25%',
  },
  heartContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.foreground,
    marginBottom: spacing.xl,
    textAlign: 'center',
    letterSpacing: 0.02,
  },
  description: {
    fontSize: 18,
    color: colors.foregroundSecondary,
    textAlign: 'center',
    marginBottom: spacing['3xl'],
    lineHeight: 28,
  },
  buttonContainer: {
    width: '100%',
  },
});

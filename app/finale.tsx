import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, MailOpen, ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Button, Card } from '../components';
import { isLetterRead, markLetterRead } from '../lib/storage';
import { colors, typography, spacing, borderRadius } from '../lib/theme';

export default function FinaleScreen() {
  const router = useRouter();
  const [hasReadBefore, setHasReadBefore] = useState(false);

  useEffect(() => {
    async function checkLetterStatus() {
      const read = await isLetterRead();
      setHasReadBefore(read);
    }
    checkLetterStatus();
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const handleMarkAsRead = async () => {
    await markLetterRead();
    setHasReadBefore(true);
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundTertiary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MotiView
          from={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 100, duration: 400 }}
        >
          <Button variant="ghost" size="sm" onPress={handleGoBack} leftIcon={<ChevronLeft size={20} color={colors.foreground} />}>
            Back
          </Button>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 200, duration: 600, type: 'spring' }}
          style={styles.iconContainer}
        >
          <MailOpen size={72} color={colors.lovePrimary} />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 400, duration: 600 }}
        >
          <Text style={styles.title}>My Letter to You</Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 500, duration: 500 }}
        >
          {hasReadBefore ? (
            <Text style={styles.note}>You've read this letter before. Here it is again...</Text>
          ) : (
            <Card variant="bordered" size="md" style={styles.warningContainer}>
              <Text style={styles.warningText}>
                This letter is just for you. Once you read it, it will be marked as read.
              </Text>
            </Card>
          )}
        </MotiView>

        <MotiView
          from={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 600, duration: 800 }}
        >
          <Card variant="glass" size="full" style={styles.letterContainer}>
            <Text style={styles.letterText}>
              My Dearest Erica Joy,

              As I sit here thinking about our 18 incredible months together, 
              my heart is so full that I barely know where to begin.

              From the moment we first met, I knew there was something 
              special about you. But I never could have imagined just how 
              much you would come to mean to me.

              You've brought light into my life in ways I never thought 
              possible. Your laugh, your smile, the way you look at me like 
              I'm the only person in the world - these are the things that 
              make my heart race every single day.

              We've shared so many beautiful moments together - from our 
              first date to moving in together, from lazy Sunday mornings 
              to our wildest adventures. Every memory with you is 
              precious to me.

              But what I love most about our relationship is how we keep 
              growing together. We've faced challenges and we've celebrated 
              victories. Through it all, we've only grown stronger.

              You've taught me what it means to truly love someone - to 
              support them, to encourage them, to be there for them no 
              matter what. And in return, you've given me the greatest gift 
              of all: your love.

              I don't know what the future holds, but I know that I want to 
              face it all with you by my side. You're my best friend, my 
              partner, my love.

              Thank you for these amazing 18 months. Here's to a lifetime 
              more of loving you.

              Forever yours,
              [Your Name]
            </Text>
          </Card>
        </MotiView>

        {!hasReadBefore && (
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 800, duration: 500 }}
          >
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleMarkAsRead}
              glow
              style={styles.markReadButton}
            >
              Mark as Read
            </Button>
          </MotiView>
        )}

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1000, duration: 600 }}
        >
          <View style={styles.footer}>
            <Heart size={20} color={colors.lovePrimary} fill={colors.lovePrimary} />
            <Text style={styles.footerText}>18 Months of Love</Text>
            <Heart size={20} color={colors.lovePrimary} fill={colors.lovePrimary} />
          </View>
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingTop: 60,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  note: {
    fontSize: typography.fontSize.sm,
    color: colors.foregroundTertiary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  warningContainer: {
    marginBottom: spacing.xl,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.lovePrimary,
  },
  warningText: {
    fontSize: typography.fontSize.sm,
    color: colors.loveLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  letterContainer: {
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  letterText: {
    fontSize: typography.fontSize.lg,
    color: colors.foreground,
    lineHeight: 30,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  markReadButton: {
    marginBottom: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[700],
  },
  footerText: {
    fontSize: typography.fontSize.base,
    color: colors.lovePrimary,
    fontWeight: typography.fontWeight.bold,
  },
});

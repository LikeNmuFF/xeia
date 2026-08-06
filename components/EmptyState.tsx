import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, borderRadius } from '../lib/theme';
import { Image as ImageIcon, Camera, Calendar, Heart, MailOpen } from 'lucide-react-native';

// Empty state types for different screens
type EmptyStateType = 
  | 'gallery'      // No photos yet
  | 'timeline'     // No timeline events
  | 'photobooth'   // No photos captured yet
  | 'letter'       // Letter not read yet
  | 'search'       // No search results
  | 'error'        // Error state
  | 'custom'       // Custom empty state
;

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onActionPress?: () => void;
  actionIcon?: React.ReactNode;
  compact?: boolean;
}

// Configuration for each empty state type
const emptyStateConfigs: Record<EmptyStateType, {
  title: string;
  description: string;
  icon: React.ReactNode;
}> = {
  gallery: {
    title: 'No Photos Yet',
    description: 'Start capturing memories with the Photobooth or add photos from your gallery.',
    icon: <ImageIcon size={48} color={colors.lovePrimary} />,
  },
  timeline: {
    title: 'No Events Yet',
    description: 'Your relationship timeline will appear here. Add your first memory to get started.',
    icon: <Calendar size={48} color={colors.goldPrimary} />,
  },
  photobooth: {
    title: 'Ready to Capture',
    description: 'Tap the camera button below to take your first photo. It will be saved and uploaded automatically.',
    icon: <Camera size={48} color={colors.purplePrimary} />,
  },
  letter: {
    title: 'A Letter for You',
    description: 'Reach 100% on the Love Meter to unlock this special message.',
    icon: <MailOpen size={48} color={colors.loveLight} />,
  },
  search: {
    title: 'No Results Found',
    description: 'Try adjusting your search terms or check back later.',
    icon: <ImageIcon size={48} color={colors.foregroundTertiary} />,
  },
  error: {
    title: 'Something Went Wrong',
    description: 'We encountered an issue. Please try again or check your connection.',
    icon: <Heart size={48} color={colors.error} />,
  },
  custom: {
    title: '',
    description: '',
    icon: null,
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'custom',
  title,
  description,
  icon,
  actionText,
  onActionPress,
  actionIcon,
  compact = false,
}) => {
  const config = emptyStateConfigs[type];
  
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalIcon = icon || config.icon;

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      <View style={[styles.iconContainer, compact && styles.compactIconContainer]}>
        {finalIcon}
      </View>
      
      <Text style={[styles.title, compact && styles.compactTitle]}>
        {finalTitle}
      </Text>
      
      <Text style={[styles.description, compact && styles.compactDescription]}>
        {finalDescription}
      </Text>
      
      {actionText && onActionPress && (
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onActionPress}
        >
          {actionIcon && (
            <View style={styles.actionIcon}>
              {actionIcon}
            </View>
          )}
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Gallery Empty State with special styling
export const GalleryEmptyState: React.FC<Omit<EmptyStateProps, 'type'>> = (props) => (
  <EmptyState 
    type="gallery" 
    actionText="Take a Photo" 
    onActionPress={props.onActionPress}
    {...props}
  />
);

// Timeline Empty State
export const TimelineEmptyState: React.FC<Omit<EmptyStateProps, 'type'>> = (props) => (
  <EmptyState 
    type="timeline" 
    actionText="Add Event" 
    onActionPress={props.onActionPress}
    {...props}
  />
);

// Photobooth Empty State
export const PhotoboothEmptyState: React.FC<Omit<EmptyStateProps, 'type'>> = (props) => (
  <EmptyState 
    type="photobooth" 
    {...props}
  />
);

// Error State with retry
export const ErrorState: React.FC<{
  message?: string;
  onRetry?: () => void;
}> = ({ message, onRetry }) => (
  <EmptyState 
    type="error" 
    description={message || emptyStateConfigs.error.description}
    actionText="Try Again" 
    onActionPress={onRetry}
  />
);

// Network Error State
export const NetworkErrorState: React.FC<{
  onRetry?: () => void;
}> = ({ onRetry }) => (
  <EmptyState 
    type="error" 
    title="No Connection" 
    description="You're offline. Some features may be limited. Reconnect to sync your data."
    actionText="Retry" 
    onActionPress={onRetry}
  />
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  compactContainer: {
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.backgroundSecondary,
  },
  compactIconContainer: {
    marginBottom: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    textAlign: 'center',
    marginBottom: 8,
  },
  compactTitle: {
    fontSize: typography.fontSize.lg,
    marginBottom: 4,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.foregroundSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  compactDescription: {
    fontSize: typography.fontSize.sm,
    lineHeight: 20,
    maxWidth: 200,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.lovePrimary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: borderRadius.lg,
    marginTop: 24,
    minWidth: 180,
  },
  actionIcon: {
    marginRight: 4,
  },
  actionText: {
    color: colors.foreground,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default EmptyState;

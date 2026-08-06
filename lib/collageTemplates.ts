import { colors } from './theme';

export interface CollageTemplate {
  id: string;
  name: string;
  layout: '2x2';
  header: string;
  footer: (date: Date) => string;
  colors: {
    border: string;
    background: string;
    headerText: string;
    footerText: string;
    accent: string;
  };
}

export const TULIP_LOVE_TEMPLATE: CollageTemplate = {
  id: 'tulip-love',
  name: 'Tulip Love',
  layout: '2x2',
  header: '♥ Our Love Story ♥',
  footer: (date: Date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  },
  colors: {
    border: colors.tulipPink,
    background: colors.background,
    headerText: colors.cream,
    footerText: colors.tulipYellow,
    accent: colors.tulipPink,
  },
};

export const templates: CollageTemplate[] = [TULIP_LOVE_TEMPLATE];

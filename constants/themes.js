import { PixelRatio } from 'react-native';
const lowRes = PixelRatio.get() < 3;

export const light = {
  colors: {
    primary: '#66a1ee',
    accent: '#F98B88',
    black: '#243B53',
    greyDark: '#334E68',
    grey: '#486581',
    lightGrey: '#D9E2EC',
    whiteGrey: '#F0F4F8',
    white: '#ffffff',
  },
  sizes: {
    xl: lowRes ? 16 : 24,
    lg: lowRes ? 14 : 20,
    normal: lowRes ? 10 : 16,
    sm: lowRes ? 8 : 12,
    xs: lowRes ? 6 : 8,
  },
};

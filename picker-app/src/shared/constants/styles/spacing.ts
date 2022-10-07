import { Size, SizeCode } from 'shared/types/style-props';

export const $spacing: { [key in SizeCode]: Size } = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
};

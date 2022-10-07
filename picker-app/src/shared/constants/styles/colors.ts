import { Theme } from '@emotion/react';

const $pallete = {
  black: '#000000',
  blackClear: '#0000000a',
  gray1: '#EBEBEB',
  gray2: '#DDDDDD',
  white: '#ffffff',
  blue: '#D2FAFF',
};

export const $colors = {
  main: $pallete.black,
  primary: $pallete.white,
  background: $pallete.white,
  backgroundHover: $pallete.blackClear,
  lowDivider: $pallete.gray2,
};

export const $typographyColors = {
  default: $pallete.black,
  low: $pallete.gray1,
  inverse: $pallete.white,
};

type PickerTheme = typeof $colors & { typography: typeof $typographyColors };

// ThemeProviderのthemeに渡したものをuseThemeで受け取るときの型を上書き
declare module '@emotion/react' {
  interface Theme extends PickerTheme {
    main: string; // interfaceは差分なしで拡張できないのでやむなく追加
  }
}

export const trackAndFieldTheme: Theme = {
  ...$colors,
  primary: $pallete.blue,
  typography: $typographyColors,
};

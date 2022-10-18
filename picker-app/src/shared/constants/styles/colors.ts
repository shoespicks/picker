import { Theme } from '@emotion/react';

/**
 * 色が増えたら追加する
 */
const $pallete = {
  black: '#000000',
  blackClear: '#0000000A',
  blackClearDark: '#6666668C',
  whiteClear: '#FFFFFF40',
  gray1: '#EBEBEB',
  gray2: '#DDDDDD',
  gray3: '#B9B9B9',
  gray4: '#666666',
  white: '#ffffff',
  blue: '#0671dc',
  lightBlue: '#D2FAFF',
};

const $shadowPallete = {
  left: '-8px 0 16px #00000055',
};

const typographyColors = ['default', 'dark', 'low', 'disable', 'inverse'] as const;
// export type TypographyColors = 'default' | 'dark' | 'low' | 'disable' | 'inverse';
export type TypographyColors = typeof typographyColors[number];

const themeBaseTypographyColors: { [key in TypographyColors]: string } = {
  default: $pallete.black,
  dark: $pallete.gray4,
  low: $pallete.gray3,
  disable: $pallete.gray1,
  inverse: $pallete.white,
};

/**
 * 色や色の用途が増えたら追加する
 */
const themeBase = {
  main: $pallete.black,
  primary: $pallete.black,
  background: $pallete.white,
  backgroundHover: $pallete.blackClear,
  inverseHover: $pallete.whiteClear,
  backdrop: $pallete.blackClearDark,
  border: $pallete.black,
  lowBorder: $pallete.gray2,
  focusOutline: $pallete.blue,

  text: themeBaseTypographyColors,

  // ↑のtextの色の書き方に寄せてこっちは消す
  textDefault: themeBaseTypographyColors.default,
  textDark: themeBaseTypographyColors.dark,
  textLow: themeBaseTypographyColors.low,
  textDisable: themeBaseTypographyColors.disable,
  textInverse: themeBaseTypographyColors.inverse,

  shadowLeft: $shadowPallete.left,
};

type PickerTheme = typeof themeBase;

// ThemeProviderのthemeに渡したものをuseThemeで受け取るときの型を上書き
declare module '@emotion/react' {
  interface Theme extends PickerTheme {
    main: string; // interfaceは差分なしで拡張できないのでやむなく追加
  }
}

export const homeTheme: Theme = themeBase;

export const trackAndFieldTheme: Theme = {
  ...themeBase,
  primary: $pallete.lightBlue,
};

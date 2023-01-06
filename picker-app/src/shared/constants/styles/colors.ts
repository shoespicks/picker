import { Theme } from '@emotion/react';

/**
 * 色が増えたら追加する
 */
const $pallete = {
  black: '#000000',
  brack2: '#222222',
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
  default: $pallete.brack2,
  dark: $pallete.gray4,
  low: $pallete.gray3,
  disable: $pallete.gray1,
  inverse: $pallete.white,
};

/**
 * 色や色の用途が増えたら追加する
 */
export const themeBase = {
  main: $pallete.black,
  primary: $pallete.black,
  background: $pallete.white,
  backgroundHover: $pallete.blackClear,
  inverseOverlayHover: $pallete.whiteClear,
  mainHover: $pallete.gray4,
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
export const homeTheme: Theme = themeBase;

/**
 * 陸上の専用色はここで上書きする
 */
export const trackAndFieldTheme: Theme = {
  ...themeBase,
  primary: $pallete.lightBlue,
};

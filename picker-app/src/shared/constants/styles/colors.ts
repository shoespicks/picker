import { Theme } from '@emotion/react';

/**
 * 色が増えたら追加する
 */
const $pallete = {
  black: '#000000',
  blackClear: '#0000000a',
  gray1: '#EBEBEB',
  gray2: '#DDDDDD',
  white: '#ffffff',
  blue: '#D2FAFF',
};

/**
 * 色や色の用途が増えたら追加する
 */
const themeBase = {
  main: $pallete.black,
  primary: $pallete.black,
  background: $pallete.white,
  backgroundHover: $pallete.blackClear,
  border: $pallete.black,
  lowBorder: $pallete.gray2,

  // ここから文字色
  textDefault: $pallete.black,
  textLow: $pallete.gray1,
  textInverse: $pallete.white,
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
  primary: $pallete.blue,
};

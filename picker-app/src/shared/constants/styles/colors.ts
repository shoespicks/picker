import { Theme } from '@emotion/react';

/**
 * 色が増えたら追加する
 */
const $pallete = {
  black: '#000000',
  blackClear: '#0000000a',
  gray1: '#EBEBEB',
  gray2: '#DDDDDD',
  gray3: '#B9B9B9',
  gray4: '#666666',
  gray4Clear: '#666666aa',
  white: '#ffffff',
  blue: '#0671dc',
  lightBlue: '#D2FAFF',
};

/**
 * 色や色の用途が増えたら追加する
 */
const themeBase = {
  main: $pallete.black,
  primary: $pallete.black,
  background: $pallete.white,
  backgroundHover: $pallete.blackClear,
  hambergerHover: $pallete.gray4Clear,
  border: $pallete.black,
  lowBorder: $pallete.gray2,
  focusOutline: $pallete.blue,

  // ここから文字色
  textDefault: $pallete.black,
  textDisable: $pallete.gray1,
  textLow: $pallete.gray3,
  textGray: $pallete.gray4,
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
  primary: $pallete.lightBlue,
};

import { ISpikeShoesFields } from '~/types/generated/contentful';
import { ISelectItem } from '~/types/selectItem';

export type shoeColorsCode = Exclude<
  ISpikeShoesFields['colors'],
  undefined
>[number];

export interface IShoeColor extends ISelectItem {
  readonly id: shoeColorsCode;
  readonly code: string;
}

export const shoeColors: { [key in shoeColorsCode]: IShoeColor } = {
  black: {
    id: 'black',
    code: '#383838'
  },
  blue: {
    id: 'blue',
    code: '#2121b1'
  },
  gold: {
    id: 'gold',
    code: '#daa520'
  },
  green: {
    id: 'green',
    code: '#419721'
  },
  lightBlue: {
    id: 'lightBlue',
    code: '#52ebff'
  },
  lightGreen: {
    id: 'lightGreen',
    code: '#adff8f'
  },
  lightOrange: {
    id: 'lightOrange',
    code: '#fcc467'
  },
  lightYellow: {
    id: 'lightYellow',
    code: '#e4f35b'
  },
  navy: {
    id: 'navy',
    code: '#223a70'
  },
  orange: {
    id: 'orange',
    code: '#ea5506'
  },
  pink: {
    id: 'pink',
    code: '#ff69b4'
  },
  red: {
    id: 'red',
    code: '#db1515'
  },
  silver: {
    id: 'silver',
    code: '#dcdcdc'
  },
  white: {
    id: 'white',
    code: '#ffffff'
  },
  yellow: {
    id: 'yellow',
    code: '#f1c40a'
  },
  purple: {
    id: 'purple',
    code: '#9754d7'
  }
} as const;

import { ISelectItem } from '~/types/selectItem';

export interface IMenuItem extends ISelectItem {
  link?: string;
  icon?: string;
}

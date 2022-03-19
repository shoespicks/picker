import { ISelectItem } from '~/types/selectItem';

export interface IMenuItem extends ISelectItem {
  readonly link?: string;
  readonly icon?: string;
}

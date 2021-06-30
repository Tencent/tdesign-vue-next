import { MenuValue } from '@TdTypes/menu/TdMenuProps';
import { Ref, VNodeChild } from 'vue';

export interface TdMenuItem {
  value: MenuValue;
  label: VNodeChild;
}

export interface TdMenuInterface {
  activeIndexValue: Ref<MenuValue>;
  expandedArray?: Ref<MenuValue[]>;
  mode: Ref<string>;
  isHead: boolean;
  select: (val: MenuValue) => void;
  open?: (val: MenuValue) => boolean;
  selectSubMenu?: (items: TdMenuItem[]) => void;
}

export interface TdSubMenuInterface {
  hasIcon?: boolean;
  addMenuItem?: (item: TdMenuItem) => void;
}

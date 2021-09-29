import { Ref, VNodeNormalizedChildren } from 'vue';
import { MenuValue } from './type';
import VMenu from './v-menu';

export interface TdMenuItem {
  value: MenuValue;
  label: VNodeNormalizedChildren;
}

export interface TdMenuInterface {
  activeValue: Ref<MenuValue>;
  activeValues: Ref<MenuValue[]>;
  expandValues?: Ref<MenuValue[]>;
  mode: Ref<string>;
  theme?: Ref<string>;
  isHead: boolean;
  vMenu?: VMenu;
  select: (val: MenuValue) => void;
  open?: (val: MenuValue) => boolean | void;
  selectSubMenu?: (items: TdMenuItem[]) => void;
}

export interface TdSubMenuInterface {
  value: MenuValue;
  hasIcon?: boolean;
  addMenuItem?: (item: TdMenuItem) => void;
}

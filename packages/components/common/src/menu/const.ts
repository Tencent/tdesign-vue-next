import { Ref, VNodeNormalizedChildren } from 'vue';
import { MenuValue } from '@td/intel/menu/type';
import VMenu from './v-menu';

export interface TdMenuItem {
  value: MenuValue;
  label: VNodeNormalizedChildren;
}

export type TdOpenType = 'add' | 'remove';

export interface TdMenuInterface {
  activeValue: Ref<MenuValue>;
  activeValues: Ref<MenuValue[]>;
  expandValues?: Ref<MenuValue[]>;
  mode: Ref<string>;
  theme?: Ref<string>;
  isHead: boolean;
  vMenu?: VMenu;
  collapsed?: Ref<boolean>;
  select: (val: MenuValue) => void;
  open?: (val: MenuValue, type?: TdOpenType) => boolean | void;
}

export interface TdSubMenuInterface {
  value?: MenuValue;
  hasIcon?: boolean;
  addMenuItem?: (item: TdMenuItem) => void;
  setSubPopup?: (popupRef: HTMLElement) => void;
  closeParentPopup?: (e: MouseEvent) => void;
}

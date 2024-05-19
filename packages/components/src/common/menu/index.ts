import type { TdHeadMenuProps, TdMenuItemProps, TdMenuProps, TdSubmenuProps } from '@td/intel/components/menu/type';
import { withInstall } from '@td/adapter-utils';
import _Menu from './menu';
import _HeadMenu from './head-menu';
import _Submenu from './submenu';
import _MenuItem from './menu-item';
import _MenuGroup from './menu-group';

import './style';

export * from '@td/intel/components/menu/type';
export type MenuProps = TdMenuProps;
export type HeadMenuProps = TdHeadMenuProps;
export type SubmenuProps = TdSubmenuProps;
export type MenuItemProps = TdMenuItemProps;

export const Menu = withInstall(_Menu);
export const HeadMenu = withInstall(_HeadMenu);
export const Submenu = withInstall(_Submenu);
export const MenuItem = withInstall(_MenuItem);
export const MenuGroup = withInstall(_MenuGroup);

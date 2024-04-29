import withInstall from '../utils/withInstall';

import _HeadMenu from './head-menu';
import _Menu from './menu';
import _MenuGroup from './menu-group';
import _MenuItem from './menu-item';
import _Submenu from './submenu';
import { TdMenuProps, TdHeadMenuProps, TdSubmenuProps, TdMenuItemProps } from './type';

import './style';

export * from './type';
export type MenuProps = TdMenuProps;
export type HeadMenuProps = TdHeadMenuProps;
export type SubmenuProps = TdSubmenuProps;
export type MenuItemProps = TdMenuItemProps;

export const Menu = withInstall(_Menu);
export const HeadMenu = withInstall(_HeadMenu);
export const Submenu = withInstall(_Submenu);
export const MenuItem = withInstall(_MenuItem);
export const MenuGroup = withInstall(_MenuGroup);

import { withInstall } from '@td/adapter-vue';
import _Menu from '@td/components-common/src/menu/menu';
import _HeadMenu from '@td/components-common/src/menu/head-menu';
import _Submenu from '@td/components-common/src/menu/submenu';
import _MenuItem from '@td/components-common/src/menu/menu-item';
import _MenuGroup from '@td/components-common/src/menu/menu-group';
import type { TdHeadMenuProps, TdMenuItemProps, TdMenuProps, TdSubmenuProps } from './type';

import '@td/components-common/src/menu/style';

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

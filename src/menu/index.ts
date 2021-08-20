import _Menu from './menu';
import _HeadMenu from './head-menu';
import _Submenu from './submenu';
import _MenuItem from './menu-item';
import _MenuGroup from './menu-group';
import { withInstall, WithInstallType } from '../utils/withInstall';
import mapProps from '../utils/map-props';
import { TdMenuProps, TdHeadMenuProps, TdSubmenuProps, TdMenuItemProps } from './type';

export * from './type';
export type MenuProps = TdMenuProps;
export type HeadMenuProps = TdHeadMenuProps;
export type SubmenuProps = TdSubmenuProps;
export type MenuItemProps = TdMenuItemProps;

export const Menu: WithInstallType<typeof _Menu> = withInstall(mapProps([{
  name: 'value', event: 'change', alias: ['modelValue'],
}])(_Menu));
export const HeadMenu: WithInstallType<typeof _HeadMenu> = withInstall(mapProps([{
  name: 'value', event: 'change', alias: ['modelValue'],
}])(_HeadMenu));
export const Submenu: WithInstallType<typeof _Submenu> = withInstall(_Submenu);
export const MenuItem: WithInstallType<typeof _MenuItem> = withInstall(_MenuItem);
export const MenuGroup: WithInstallType<typeof _MenuGroup> = withInstall(_MenuGroup);

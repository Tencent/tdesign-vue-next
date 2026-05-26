import _Drawer from './drawer';
import { withInstall } from '@tdesign/shared-utils';
import { TdDrawerProps } from './type';

import './style';

export * from './type';
export type DrawerProps = TdDrawerProps;

export const Drawer = withInstall(_Drawer);
export { default as DrawerPlugin } from './plugin';
export type { DrawerPluginType } from './plugin';
export default Drawer;

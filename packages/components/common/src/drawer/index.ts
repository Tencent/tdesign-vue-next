import { withInstall } from '@td/adapter-utils';
import type { TdDrawerProps } from '@td/intel/drawer/type';
import _Drawer from './drawer';

import './style';

export * from '@td/intel/drawer/type';
export type DrawerProps = TdDrawerProps;

export const Drawer = withInstall(_Drawer);
export default Drawer;

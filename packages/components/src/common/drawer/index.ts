import _Drawer from './drawer';
import { withInstall } from '@td/adapter-utils';
import type { TdDrawerProps } from '@td/intel/components/drawer/type';

import './style';

export * from '@td/intel/components/drawer/type';
export type DrawerProps = TdDrawerProps;

export const Drawer = withInstall(_Drawer);
export default Drawer;

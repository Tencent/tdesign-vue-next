import _Drawer from './drawer';
import withInstall from '../utils/withInstall';
import { TdDrawerProps } from '@td/intel/drawer/type';

import './style';

export * from '@td/intel/drawer/type';
export type DrawerProps = TdDrawerProps;

export const Drawer = withInstall(_Drawer);
export default Drawer;

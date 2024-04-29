import withInstall from '../utils/withInstall';

import _Drawer from './drawer';
import { TdDrawerProps } from './type';

import './style';

export * from './type';
export type DrawerProps = TdDrawerProps;

export const Drawer = withInstall(_Drawer);
export default Drawer;

import _Drawer from './drawer';
import withInstall from '../utils/withInstall';
import { TdDrawerProps } from './type';

import './style';

export * from './type';
export type DrawerProps = TdDrawerProps;

export const Drawer = withInstall(_Drawer);
export default Drawer;

import _Drawer from './drawer';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdDrawerProps } from './type';

import './style';

export * from './type';
export type DrawerProps = TdDrawerProps;

export const Drawer: WithInstallType<typeof _Drawer> = withInstall(_Drawer);
export default Drawer;

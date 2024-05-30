import { withInstall } from '@td/adapter-vue';
import _Drawer from '@td/components-common/src/drawer/drawer';
import type { TdDrawerProps } from './type';

import '@td/components-common/src/drawer/style';

export * from './type';
export type DrawerProps = TdDrawerProps;

export const Drawer = withInstall(_Drawer);
export default Drawer;

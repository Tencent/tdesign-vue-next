import { withInstall } from '@td/adapter-vue';
import type { TdDrawerProps } from '@td/components/drawer/type';
import _Drawer from '@td/components-common/src/drawer/drawer';

import '@td/components-common/src/drawer/style';

export * from '@td/components/drawer/type';
export type DrawerProps = TdDrawerProps;

export const Drawer = withInstall(_Drawer);
export default Drawer;

import { withInstall } from '@td/adapter-vue';
import _Tabs from '@td/components-common/src/tabs/tabs';
import _TabPanel from '@td/components-common/src/tabs/tab-panel';
import type { TdTabPanelProps, TdTabsProps } from './type';

import '@td/components-common/src/tabs/style';

export * from './type';
export type TabsProps = TdTabsProps;
export type TabPanelProps = TdTabPanelProps;

export const Tabs = withInstall(_Tabs);
export const TabPanel = withInstall(_TabPanel);
export default Tabs;

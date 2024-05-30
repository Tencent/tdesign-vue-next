import { withInstall } from '@td/adapter-vue';
import type { TdTabPanelProps, TdTabsProps } from '@td/components/tabs/type';
import _Tabs from '@td/components-common/src/tabs/tabs';
import _TabPanel from '@td/components-common/src/tabs/tab-panel';

import '@td/components-common/src/tabs/style';

export * from '@td/components/tabs/type';
export type TabsProps = TdTabsProps;
export type TabPanelProps = TdTabPanelProps;

export const Tabs = withInstall(_Tabs);
export const TabPanel = withInstall(_TabPanel);
export default Tabs;

import _Tabs from './tabs';
import _TabPanel from './tab-panel';
import { withInstall } from '@td/adapter-utils';
import type { TdTabsProps, TdTabPanelProps } from '@td/intel/components/tabs/type';

import './style';

export * from '@td/intel/components/tabs/type';
export type TabsProps = TdTabsProps;
export type TabPanelProps = TdTabPanelProps;

export const Tabs = withInstall(_Tabs);
export const TabPanel = withInstall(_TabPanel);
export default Tabs;

import { withInstall } from '@td/adapter-utils';
import type { TdTabPanelProps, TdTabsProps } from '@td/intel/tabs/type';
import _Tabs from './tabs';
import _TabPanel from './tab-panel';

import './style';

export * from '@td/intel/tabs/type';
export type TabsProps = TdTabsProps;
export type TabPanelProps = TdTabPanelProps;

export const Tabs = withInstall(_Tabs);
export const TabPanel = withInstall(_TabPanel);
export default Tabs;

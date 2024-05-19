import _Tabs from './tabs';
import _TabPanel from './tab-panel';
import withInstall from '../utils/withInstall';
import { TdTabsProps, TdTabPanelProps } from '@td/intel/tabs/type';

import './style';

export * from '@td/intel/tabs/type';
export type TabsProps = TdTabsProps;
export type TabPanelProps = TdTabPanelProps;

export const Tabs = withInstall(_Tabs);
export const TabPanel = withInstall(_TabPanel);
export default Tabs;

import withInstall from '../utils/withInstall';

import _TabPanel from './tab-panel';
import _Tabs from './tabs';
import { TdTabsProps, TdTabPanelProps } from './type';

import './style';

export * from './type';
export type TabsProps = TdTabsProps;
export type TabPanelProps = TdTabPanelProps;

export const Tabs = withInstall(_Tabs);
export const TabPanel = withInstall(_TabPanel);
export default Tabs;

import _Tabs from './tabs';
import _TabPanel from './tab-panel';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTabsProps, TdTabPanelProps } from './type';

import './style';

export * from './type';
export type TabsProps = TdTabsProps;
export type TabPanelProps = TdTabPanelProps;

export const Tabs: WithInstallType<typeof _Tabs> = withInstall(_Tabs);
export const TabPanel: WithInstallType<typeof _TabPanel> = withInstall(_TabPanel);
export default Tabs;

import _Tabs from './tabs';
import _TabPanel from './tab-panel';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTabsProps, TdTabPanelProps } from './type';

export * from './type';
export type TabsProps = TdTabsProps;
export type TabPanelProps = TdTabPanelProps;

const LocalTabs = mapProps([{
  name: 'value',
  alias: ['modelValue'],
}])(_Tabs);

export const Tabs: WithInstallType<typeof LocalTabs> = withInstall(LocalTabs);
export const TabPanel: WithInstallType<typeof _TabPanel> = withInstall(_TabPanel);
export default Tabs;

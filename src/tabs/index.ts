import _Tabs from './tabs';
import _TabPanel from './tab-panel';
import mapProps from '../utils/map-props';
import { withInstall } from '../utils/withInstall';
import { TdTabsProps, TdTabPanelProps } from './type';

import './style';

export * from './type';
export type TabsProps = TdTabsProps;
export type TabPanelProps = TdTabPanelProps;

export const Tabs = withInstall(
  mapProps([
    {
      name: 'value',
      alias: ['modelValue'],
      event: 'change',
    },
  ])(_Tabs),
);

export const TabPanel = withInstall(_TabPanel);
export default Tabs;

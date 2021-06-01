import _Tabs from './tabs';
import _TabPanel from './tab-panel';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';

const LocalTabs = mapProps([{
  name: 'value',
  alias: ['modelValue'],
}])(_Tabs);

const Tabs: WithInstallType<typeof LocalTabs> = withInstall(LocalTabs);
const TabPanel: WithInstallType<typeof _TabPanel> = withInstall(_TabPanel);

export { Tabs, TabPanel };
export default Tabs;

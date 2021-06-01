import _Tabs from './tabs';
import TabPanel from './tab-panel';
import setInstallFn from '../utils/setInstallFn';
import mapProps from '../utils/map-props';

const Tabs = mapProps([{
  name: 'value',
  alias: ['modelValue'],
}])(_Tabs);

setInstallFn('Tabs', Tabs);
setInstallFn('TabPanel', TabPanel);

export { Tabs, TabPanel };
export default Tabs;

import _Tabs from './tabs';
import TabPanel from './tab-panel';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';

const Tabs = mapProps(['value'], { model: { prop: 'value', event: 'change' } })(_Tabs);

setInstallFn('Tabs', Tabs);
setInstallFn('TabPanel', TabPanel);

export { Tabs, TabPanel };
export default Tabs;

import Tabs from './tabs';
import TabPanel from './tab-panel.vue';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('Tabs', Tabs);
setInstallFn('TabPanel', TabPanel);

export { Tabs, TabPanel };
export default Tabs;

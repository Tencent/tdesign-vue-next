import _Drawer from './drawer';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Drawer: WithInstallType<typeof _Drawer> = withInstall(_Drawer);

export { Drawer };
export default Drawer;

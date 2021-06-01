import _Tooltip from './tooltip.vue';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Tooltip: WithInstallType<typeof _Tooltip> = withInstall(_Tooltip);

export { Tooltip };
export default Tooltip;

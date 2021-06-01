import _Icon from './svg/icon';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Icon: WithInstallType<typeof _Icon> = withInstall(_Icon);

export { Icon };
export default Icon;

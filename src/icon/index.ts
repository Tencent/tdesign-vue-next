import _Icon from './svg/icon';
import { withInstall, WithInstallType } from '../utils/withInstall';

import './style';

export const Icon: WithInstallType<typeof _Icon> = withInstall(_Icon);
export default Icon;

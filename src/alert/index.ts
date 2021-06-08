import _Alert from './alert';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Alert: WithInstallType<typeof _Alert> = withInstall(_Alert);

export { Alert };
export default Alert;

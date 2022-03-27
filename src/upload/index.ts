import _Upload from './upload';
import { withInstall, WithInstallType } from '../utils/withInstall';

import './style';

export * from './interface';

export const Upload: WithInstallType<typeof _Upload> = withInstall(_Upload);
export default Upload;

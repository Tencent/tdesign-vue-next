import _Upload from './upload';
import withInstall from '../utils/withInstall';

import './style';

export * from './types';

export const Upload = withInstall(_Upload);
export default Upload;

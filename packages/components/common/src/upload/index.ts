import _Upload from './upload';
import { withInstall } from '@td/adapter-utils';

import './style';

export * from './interface';

export const Upload = withInstall(_Upload);
export default Upload;

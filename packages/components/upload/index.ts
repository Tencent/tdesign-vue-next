import _Upload from './upload';
import { withInstall } from '@tdesign/shared-utils';

import './style';

export * from './types';
export const Upload = withInstall(_Upload);
export default Upload;

import { withInstall } from '@td/adapter-vue';
import _Upload from './upload';

import './style';

export * from './interface';

export const Upload = withInstall(_Upload);
export default Upload;

import { withInstall } from '@td/adapter-vue';
import _Upload from '@td/components-common/src/upload/upload';

import '@td/components-common/src/upload/style';

export * from '@td/components-common/src/upload/interface';

export const Upload = withInstall(_Upload);
export default Upload;

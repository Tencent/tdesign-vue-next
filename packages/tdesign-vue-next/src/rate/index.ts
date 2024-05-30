import { withInstall } from '@td/adapter-vue';
import _Rate from '@td/components-common/src/rate/rate';

import '@td/components-common/src/rate/style';

export * from './type';

export const Rate = withInstall(_Rate);

export default Rate;

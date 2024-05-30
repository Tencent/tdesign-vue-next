import { withInstall } from '@td/adapter-vue';
import _Rate from './rate';

import './style';

export * from '@td/components/rate/type';

export const Rate = withInstall(_Rate);

export default Rate;

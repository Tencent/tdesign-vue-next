import _Rate from './rate';
import { withInstall } from '@td/adapter-utils';

import './style';

export * from '@td/intel/rate/type';

export const Rate = withInstall(_Rate);

export default Rate;

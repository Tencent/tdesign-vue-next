import _Rate from './rate';
import withInstall from '../utils/withInstall';

import './style';

export * from '@td/intel/rate/type';

export const Rate = withInstall(_Rate);

export default Rate;

import _Progress from './progress';
import { withInstall } from '@td/adapter-utils';
import { TdProgressProps } from '@td/intel/progress/type';

import './style';

export type ProgressProps = TdProgressProps;
export * from '@td/intel/progress/type';

export const Progress = withInstall(_Progress);

export default Progress;

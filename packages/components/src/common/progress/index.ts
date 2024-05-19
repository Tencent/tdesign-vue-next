import _Progress from './progress';
import { withInstall } from '@td/adapter-utils';
import type { TdProgressProps } from '@td/intel/components/progress/type';

import './style';

export type ProgressProps = TdProgressProps;
export * from '@td/intel/components/progress/type';

export const Progress = withInstall(_Progress);

export default Progress;

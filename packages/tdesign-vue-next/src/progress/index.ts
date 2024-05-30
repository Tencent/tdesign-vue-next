import { withInstall } from '@td/adapter-vue';
import type { TdProgressProps } from './type';
import _Progress from '@td/components-common/src/progress/progress';

import '@td/components-common/src/progress/style';

export type ProgressProps = TdProgressProps;
export * from './type';

export const Progress = withInstall(_Progress);

export default Progress;

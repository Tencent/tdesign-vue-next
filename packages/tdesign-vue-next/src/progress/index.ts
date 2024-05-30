import { withInstall } from '@td/adapter-vue';
import type { TdProgressProps } from '@td/components/progress/type';
import _Progress from '@td/components-common/src/progress/progress';

import '@td/components-common/src/progress/style';

export type ProgressProps = TdProgressProps;
export * from '@td/components/progress/type';

export const Progress = withInstall(_Progress);

export default Progress;

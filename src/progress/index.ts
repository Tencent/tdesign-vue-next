import _Progress from './progress.vue';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdProgressProps } from './type';

export type ProgressProps = TdProgressProps;
export * from './type';

export const Progress: WithInstallType<typeof _Progress> = withInstall(_Progress);

export default Progress;

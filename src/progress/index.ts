import _Progress from './progress.vue';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Progress: WithInstallType<typeof _Progress> = withInstall(_Progress);

export { Progress };
export default Progress;

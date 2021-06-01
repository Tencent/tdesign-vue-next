import _Steps from './steps.vue';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Steps: WithInstallType<typeof _Steps> = withInstall(_Steps);

export { Steps };
export default Steps;

import _Loading from './loading';
import { withInstall, WithInstallType } from '../utils/withInstall';
import LoadingPlugin from './plugin';

const Loading: WithInstallType<typeof _Loading> = withInstall(_Loading);

export { Loading, LoadingPlugin };
export default Loading;

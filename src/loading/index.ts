import Loading from './loading';
import setInstallFn from '../utils/setInstallFn';
import LoadingPlugin from './plugin';

setInstallFn('Loading', Loading);
export { Loading, LoadingPlugin };

export default Loading;


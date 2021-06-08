import _Dialog from './dialog';
import DialogPlugin from './plugin';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Dialog: WithInstallType<typeof _Dialog> = withInstall(_Dialog);

export { Dialog, DialogPlugin };
export default Dialog;

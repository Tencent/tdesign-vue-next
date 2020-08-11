import Dialog from './dialog';
import DialogPlugin from './plugin';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('Dialog', Dialog);

export { Dialog, DialogPlugin };
export default Dialog;

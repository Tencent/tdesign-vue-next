import DialogComponent from './dialog';
import * as functions from './functions';

type ExportedDialog = typeof DialogComponent & typeof functions

const Dialog = DialogComponent as ExportedDialog;

Dialog.confirm = functions.confirm;
Dialog.alert = functions.alert;

export default Dialog;

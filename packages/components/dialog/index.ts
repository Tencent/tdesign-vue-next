import _Dialog from './dialog';
import _DialogCard from './dialogCard';
import withInstall from '../utils/withInstall';
import { TdDialogProps } from './type';

import './style';

export * from './type';
export type DialogProps = TdDialogProps;

export const Dialog = withInstall(_Dialog);
export const DialogCard = withInstall(_DialogCard);

export { default as DialogPlugin } from './plugin';
export default Dialog;

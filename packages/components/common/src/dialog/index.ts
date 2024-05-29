import { withInstall } from '@td/adapter-vue';
import type { TdDialogProps } from '@td/intel/dialog/type';
import _Dialog from './dialog';

import './style';

export * from '@td/intel/dialog/type';
export type DialogProps = TdDialogProps;

export const Dialog = withInstall(_Dialog);
export { default as DialogPlugin } from './plugin';
export default Dialog;

import { withInstall } from '@td/adapter-vue';
import type { TdDialogProps } from '@td/components/dialog/type';
import _Dialog from './dialog';

import './style';

export * from '@td/components/dialog/type';
export type DialogProps = TdDialogProps;

export const Dialog = withInstall(_Dialog);
export { default as DialogPlugin } from './plugin';
export default Dialog;

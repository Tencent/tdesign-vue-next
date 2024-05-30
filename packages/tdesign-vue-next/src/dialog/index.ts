import { withInstall } from '@td/adapter-vue';
import type { TdDialogProps } from './type';
import _Dialog from '@td/components-common/src/dialog/dialog';

import '@td/components-common/src/dialog/style';

export * from './type';
export type DialogProps = TdDialogProps;

export const Dialog = withInstall(_Dialog);
export { default as DialogPlugin } from '@td/components-common/src/dialog/plugin';
export default Dialog;

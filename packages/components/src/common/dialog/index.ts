import _Dialog from './dialog';
import { withInstall } from '@td/adapter-utils';
import type { TdDialogProps } from '@td/intel/components/dialog/type';

import './style';

export * from '@td/intel/components/dialog/type';
export type DialogProps = TdDialogProps;

export const Dialog = withInstall(_Dialog);
export { default as DialogPlugin } from './plugin';
export default Dialog;

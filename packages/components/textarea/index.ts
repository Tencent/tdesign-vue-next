import _Textarea from './textarea';
import { withInstall } from '@tdesign/shared-utils';
import { TdTextareaProps } from './type';

import './style';

export * from './type';
export type TextareaProps = TdTextareaProps;

export const Textarea = withInstall(_Textarea);
export default Textarea;

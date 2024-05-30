import { withInstall } from '@td/adapter-vue';
import type { TdTextareaProps } from '@td/components/textarea/type';
import _Textarea from './textarea';

import './style';

export * from '@td/components/textarea/type';
export type TextareaProps = TdTextareaProps;

export const Textarea = withInstall(_Textarea);
export default Textarea;

import _Textarea from './textarea';
import { withInstall } from '@td/adapter-utils';
import type { TdTextareaProps } from '@td/intel/components/textarea/type';

import './style';

export * from '@td/intel/components/textarea/type';
export type TextareaProps = TdTextareaProps;

export const Textarea = withInstall(_Textarea);
export default Textarea;

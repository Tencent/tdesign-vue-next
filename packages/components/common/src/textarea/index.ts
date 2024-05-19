import _Textarea from './textarea';
import withInstall from '../utils/withInstall';
import { TdTextareaProps } from '@td/intel/textarea/type';

import './style';

export * from '@td/intel/textarea/type';
export type TextareaProps = TdTextareaProps;

export const Textarea = withInstall(_Textarea);
export default Textarea;

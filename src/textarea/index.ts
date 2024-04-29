import withInstall from '../utils/withInstall';

import _Textarea from './textarea';
import { TdTextareaProps } from './type';

import './style';

export * from './type';
export type TextareaProps = TdTextareaProps;

export const Textarea = withInstall(_Textarea);
export default Textarea;

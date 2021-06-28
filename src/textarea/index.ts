import _Textarea from './textarea';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/withInstall';
import { TdTextareaProps } from '../../types/textarea/TdTextareaProps';

export type TextareaProps = TdTextareaProps

export const Textarea = setInstallFn('Textarea', mapProps(['value'])(_Textarea));
export default Textarea;

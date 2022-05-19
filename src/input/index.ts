import _Addon from './addon';
import _Input from './input';
import _InputGroup from './input-group';
import withInstall from '../utils/withInstall';
import { TdInputProps } from './type';

import './style';

export * from './type';
export type InputProps = TdInputProps;

export const Addon = withInstall(_Addon);
export const Input = withInstall(_Input);
export const InputGroup = withInstall(_InputGroup);

export default Input;

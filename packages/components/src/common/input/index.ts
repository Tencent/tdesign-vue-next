import { withInstall } from '@td/adapter-utils';
import type { InputValue, TdInputProps } from '@td/intel/components/input/type';
import _Input from './input';
import _InputGroup from './input-group';

import './style';

export * from '@td/intel/components/input/type';
export type InputProps<T = InputValue> = TdInputProps<T>;
export type InputBlurEventParams = Parameters<InputProps['onBlur']>;
export type InputFocusEventParams = Parameters<InputProps['onFocus']>;
export type StrInputProps = TdInputProps<string>;
export type NumberInputProps = TdInputProps<number>;

export const Input = withInstall(_Input);
export const InputGroup = withInstall(_InputGroup);

export default Input;

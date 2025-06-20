import _Input from './input';
import _InputGroup from './input-group';
import { withInstall } from '@tdesign/shared-utils';
import { InputValue, TdInputProps } from './type';

import './style';

export * from './type';
export type InputProps<T = InputValue> = TdInputProps<T>;
export type InputBlurEventParams = Parameters<InputProps['onBlur']>;
export type InputFocusEventParams = Parameters<InputProps['onFocus']>;
export type StrInputProps = TdInputProps<string>;
export type NumberInputProps = TdInputProps<number>;

export const Input = withInstall(_Input);
export const InputGroup = withInstall(_InputGroup);

export default Input;

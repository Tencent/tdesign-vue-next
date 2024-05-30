import { withInstall } from '@td/adapter-vue';
import _Input from '@td/components-common/src/input/input';
import _InputGroup from '@td/components-common/src/input/input-group';
import type { InputValue, TdInputProps } from './type';

import '@td/components-common/src/input/style';

export * from './type';
export type InputProps<T = InputValue> = TdInputProps<T>;
export type InputBlurEventParams = Parameters<InputProps['onBlur']>;
export type InputFocusEventParams = Parameters<InputProps['onFocus']>;
export type StrInputProps = TdInputProps<string>;
export type NumberInputProps = TdInputProps<number>;

export const Input = withInstall(_Input);
export const InputGroup = withInstall(_InputGroup);

export default Input;

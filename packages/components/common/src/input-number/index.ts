import { withInstall } from '@td/adapter-vue';
import type { TdInputNumberProps } from '@td/intel/input-number/type';
import _InputNumber from './input-number';

import './style';

export * from '@td/intel/input-number/type';
export type InputNumberProps = TdInputNumberProps;

export const InputNumber = withInstall(_InputNumber);
export default InputNumber;

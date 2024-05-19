import _InputNumber from './input-number';
import withInstall from '../utils/withInstall';
import { TdInputNumberProps } from '@td/intel/input-number/type';

import './style';

export * from '@td/intel/input-number/type';
export type InputNumberProps = TdInputNumberProps;

export const InputNumber = withInstall(_InputNumber);
export default InputNumber;

import _InputNumber from './input-number';
import withInstall from '../utils/withInstall';
import { TdInputNumberProps } from './type';

import './style';

export * from './type';
export type InputNumberProps = TdInputNumberProps;

export const InputNumber = withInstall(_InputNumber);
export default InputNumber;

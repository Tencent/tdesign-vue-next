import _InputNumber from './input-number';
import { withInstall, WithInstallType } from '../utils/withInstall';
import mapProps from '../utils/map-props';
import { TdInputNumberProps } from './type';

import './style';

export * from './type';
export type InputNumberProps = TdInputNumberProps;

const LocalInputNumber = mapProps([
  {
    name: 'value',
    alias: ['modelValue'],
  },
])(_InputNumber);

export const InputNumber: WithInstallType<typeof LocalInputNumber> = withInstall(LocalInputNumber);
export default InputNumber;

import _InputNumber from './input-number';
import { withInstall } from '../utils/withInstall';
import mapProps from '../utils/map-props';
import { TdInputNumberProps } from './type';

import './style';

export * from './type';
export type InputNumberProps = TdInputNumberProps;

export const InputNumber = withInstall(
  mapProps([
    {
      name: 'value',
      alias: ['modelValue'],
    },
  ])(_InputNumber),
);

export default InputNumber;

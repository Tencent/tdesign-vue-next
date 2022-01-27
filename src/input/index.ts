import _Addon from './addon';
import _Input from './input';
import _InputGroup from './input-group';
import mapProps from '../utils/map-props';
import withInstall from '../utils/withInstall';
import { TdInputProps } from './type';

import './style';

export * from './type';
export type InputProps = TdInputProps;

export const Addon = withInstall(_Addon);
export const Input = withInstall(
  mapProps([
    {
      name: 'value',
      event: ['change'],
      alias: ['modelValue'],
    },
  ])(_Input),
);
export const InputGroup = withInstall(_InputGroup);

export default Input;

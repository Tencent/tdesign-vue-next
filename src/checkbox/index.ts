import _Checkbox from './checkbox';
import _Group from './group';
import mapProps from '../utils/map-props';
import withInstall from '../utils/withInstall';
import { TdCheckboxProps } from './type';

import './style';

export * from './type';
export type CheckboxProps = TdCheckboxProps;

export const Checkbox = withInstall(
  mapProps([
    {
      name: 'checked',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_Checkbox),
);
export const CheckboxGroup = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_Group),
);

export default Checkbox;

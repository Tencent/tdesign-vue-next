import _Radio from './radio';
import _Group from './group';
import _RadioButton from './radio-button';
import mapProps from '../utils/map-props';
import withInstall from '../utils/withInstall';
import { TdRadioProps, TdRadioGroupProps } from './type';

import './style';

export * from './type';
export type RadioProps = TdRadioProps;
export type RadioGroupProps = TdRadioGroupProps;

export const Radio = withInstall(
  mapProps([
    {
      name: 'checked',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_Radio),
);
export const RadioGroup = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_Group),
);
export const RadioButton = withInstall(_RadioButton);

export default Radio;

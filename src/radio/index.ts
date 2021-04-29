import _Radio from './radio';
import _Group from './group';
import RadioButton from './radio-button';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';
import { TdRadioProps, TdRadioGroupProps } from '@TdTypes/radio/TdRadioProps';

const Radio = mapProps([{ name: 'checked', event: 'change', alias: ['modelValue'] }])(_Radio);
const RadioGroup = mapProps([{ name: 'value', event: 'change', alias: ['modelValue'] }])(_Group);

setInstallFn('Radio', Radio);
setInstallFn('RadioGroup', RadioGroup);
setInstallFn('RadioButton', RadioButton);

export * from '@TdTypes/radio/TdRadioProps';

export type RadioProps = TdRadioProps;
export type RadioGroupProps = TdRadioGroupProps;

export {
  Radio,
  RadioGroup,
  RadioButton,
};

export default Radio;

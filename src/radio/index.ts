import _Radio from './radio';
import _Group from './group';
import RadioButton from './radio-button';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';
import { TdRadioProps, RadioValue } from '@TdTypes/radio/TdRadioProps';

const Radio = mapProps(['checked'], { model: { prop: 'checked', event: 'change' } })(_Radio);
const RadioGroup = mapProps(['value'], { model: { prop: 'value', event: 'change' } })(_Group);

setInstallFn('Radio', Radio);
setInstallFn('RadioGroup', RadioGroup);
setInstallFn('RadioButton', RadioButton);

export type RadioButtonInstance = InstanceType<typeof RadioButton>;
export type RadioGroupInstance = InstanceType<typeof RadioGroup> & {
  handleRadioChange: (value: RadioValue, context: { e: Event }) => void;
};

export * from '@TdTypes/radio/TdRadioProps';

export type RadioProps = TdRadioProps;

export {
  Radio,
  RadioGroup,
  RadioButton,
};

export default Radio;

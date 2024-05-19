import RadioGroup from './radio';
import RadioButton from './radio-button';
import { RadioValue } from '@td/intel/components/radio/type';

export type RadioButtonInstance = InstanceType<typeof RadioButton>;
export type RadioGroupInstance = InstanceType<typeof RadioGroup> & {
  handleRadioChange: (value: RadioValue, context: { e: Event }) => void;
};

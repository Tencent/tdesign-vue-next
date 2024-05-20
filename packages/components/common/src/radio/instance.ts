import type { RadioValue } from '@td/intel/radio/type';
import type RadioGroup from './radio';
import type RadioButton from './radio-button';

export type RadioButtonInstance = InstanceType<typeof RadioButton>;
export type RadioGroupInstance = InstanceType<typeof RadioGroup> & {
  handleRadioChange: (value: RadioValue, context: { e: Event }) => void;
};

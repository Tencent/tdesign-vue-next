import RadioGroup from './radio';
import RadioButton from './radio-button';
import { RadioValue } from '../../types/radio/TdRadioProps';

export type RadioButtonInstance = InstanceType<typeof RadioButton>;
export type RadioGroupInstance = InstanceType<typeof RadioGroup> & {
  handleRadioChange: (value: RadioValue, context: { e: Event }) => void;
};

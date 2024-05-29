import { withInstall } from '@td/adapter-vue';
import type { TdRadioGroupProps, TdRadioProps } from '@td/intel/radio/type';
import _Radio from './radio';
import _Group from './group';
import _RadioButton from './radio-button';

import './style';

export * from '@td/intel/radio/type';
export type RadioProps = TdRadioProps;
export type RadioGroupProps = TdRadioGroupProps;

export const Radio = withInstall(_Radio);
export const RadioGroup = withInstall(_Group);
export const RadioButton = withInstall(_RadioButton);

export default Radio;

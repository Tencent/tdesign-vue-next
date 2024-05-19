import _Radio from './radio';
import _Group from './group';
import _RadioButton from './radio-button';
import { withInstall } from '@td/adapter-utils';
import type { TdRadioProps, TdRadioGroupProps } from '@td/intel/components/radio/type';

import './style';

export * from '@td/intel/components/radio/type';
export type RadioProps = TdRadioProps;
export type RadioGroupProps = TdRadioGroupProps;

export const Radio = withInstall(_Radio);
export const RadioGroup = withInstall(_Group);
export const RadioButton = withInstall(_RadioButton);

export default Radio;

import { withInstall } from '@td/adapter-vue';
import _Radio from '@td/components-common/src/radio/radio';
import _Group from '@td/components-common/src/radio/group';
import _RadioButton from '@td/components-common/src/radio/radio-button';
import type { TdRadioGroupProps, TdRadioProps } from './type';

import '@td/components-common/src/radio/style';

export * from './type';
export type RadioProps = TdRadioProps;
export type RadioGroupProps = TdRadioGroupProps;

export const Radio = withInstall(_Radio);
export const RadioGroup = withInstall(_Group);
export const RadioButton = withInstall(_RadioButton);

export default Radio;

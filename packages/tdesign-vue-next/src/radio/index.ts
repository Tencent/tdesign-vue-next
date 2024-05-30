import { withInstall } from '@td/adapter-vue';
import type { TdRadioGroupProps, TdRadioProps } from '@td/components/radio/type';
import _Radio from '@td/components-common/src/radio/radio';
import _Group from '@td/components-common/src/radio/group';
import _RadioButton from '@td/components-common/src/radio/radio-button';

import '@td/components-common/src/radio/style';

export * from '@td/components/radio/type';
export type RadioProps = TdRadioProps;
export type RadioGroupProps = TdRadioGroupProps;

export const Radio = withInstall(_Radio);
export const RadioGroup = withInstall(_Group);
export const RadioButton = withInstall(_RadioButton);

export default Radio;

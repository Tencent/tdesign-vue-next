import _Radio from './radio';
import _Group from './group';
import _RadioButton from './radio-button';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdRadioProps, TdRadioGroupProps } from './type';

export * from './type';
export type RadioProps = TdRadioProps;
export type RadioGroupProps = TdRadioGroupProps;

const LocalRadio = mapProps([{ name: 'checked', event: 'change', alias: ['modelValue'] }])(_Radio);
const LocalRadioGroup = mapProps([{ name: 'value', event: 'change', alias: ['modelValue'] }])(_Group);

export const Radio: WithInstallType<typeof LocalRadio> = withInstall(LocalRadio);
export const RadioGroup: WithInstallType<typeof LocalRadioGroup> = withInstall(LocalRadioGroup);
export const RadioButton: WithInstallType<typeof _RadioButton> = withInstall(_RadioButton);
export default Radio;

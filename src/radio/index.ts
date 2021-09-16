import _Radio from './radio';
import _Group from './group';
import _RadioButton from './radio-button';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdRadioProps, TdRadioGroupProps } from './type';

export const Radio: WithInstallType<typeof _Radio> = withInstall(mapProps([{
  name: 'checked',
  event: 'change',
  alias: ['modelValue'],
}])(_Radio));

export const RadioGroup: WithInstallType<typeof _Group> = withInstall(mapProps([{
  name: 'value',
  event: 'change',
  alias: ['modelValue'],
}])(_Group));

export const RadioButton: WithInstallType<typeof _RadioButton> = withInstall(_RadioButton);

export * from './type';

export type RadioProps = TdRadioProps;
export type RadioGroupProps = TdRadioGroupProps;

export default Radio;

import mapProps from '../utils/map-props';
import _Select from './select';
import _Option from './option';
import _OptionGroup from './optionGroup';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdSelectProps, TdOptionProps, TdOptionGroupProps } from './type';

import './style';

export * from './type';
export type SelectProps = TdSelectProps;
export type OptionProps = TdOptionProps;
export type OptionGroupProps = TdOptionGroupProps;

export const Select: WithInstallType<typeof _Select> = withInstall(mapProps([{
  name: 'value', event: 'change', alias: ['modelValue'],
}])(_Select));
export const Option: WithInstallType<typeof _Option> = withInstall(_Option);
export const OptionGroup: WithInstallType<typeof _OptionGroup> = withInstall(_OptionGroup);

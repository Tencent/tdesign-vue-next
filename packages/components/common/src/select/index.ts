import { withInstall } from '@td/adapter-utils';
import type { SelectOption, TdOptionGroupProps, TdOptionProps, TdSelectProps } from '@td/intel/select/type';
import _Select from './select';
import _Option from './option';
import _OptionGroup from './optionGroup';

import './style';

export * from '@td/intel/select/type';
export type SelectProps<T = SelectOption> = TdSelectProps<T>;
export type OptionProps = TdOptionProps;
export type OptionGroupProps = TdOptionGroupProps;

export const Select = withInstall(_Select);
export const Option = withInstall(_Option);
export const OptionGroup = withInstall(_OptionGroup);

export default Select;

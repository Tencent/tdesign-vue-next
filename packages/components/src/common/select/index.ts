import type { SelectOption, TdOptionGroupProps, TdOptionProps, TdSelectProps } from '@td/intel/components/select/type';
import { withInstall } from '@td/adapter-utils';
import _Select from './select';
import _Option from './option';
import _OptionGroup from './optionGroup';

import './style';

export * from '@td/intel/components/select/type';
export type SelectProps<T = SelectOption> = TdSelectProps<T>;
export type OptionProps = TdOptionProps;
export type OptionGroupProps = TdOptionGroupProps;

export const Select = withInstall(_Select);
export const Option = withInstall(_Option);
export const OptionGroup = withInstall(_OptionGroup);

export default Select;

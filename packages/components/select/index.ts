import _Select from './select';
import _Option from './option';
import _OptionGroup from './option-group';
import { withInstall } from '@tdesign/shared-utils';
import { TdSelectProps, TdOptionProps, TdOptionGroupProps, SelectOption } from './type';

import './style';

export * from './type';
export type SelectProps<T = SelectOption> = TdSelectProps<T>;
export type OptionProps = TdOptionProps;
export type OptionGroupProps = TdOptionGroupProps;

export const Select = withInstall(_Select);
export const Option = withInstall(_Option);
export const OptionGroup = withInstall(_OptionGroup);

export default Select;

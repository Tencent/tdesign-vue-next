import { withInstall } from '@td/adapter-vue';
import _Select from '@td/components-common/src/select/select';
import _Option from '@td/components-common/src/select/option';
import _OptionGroup from '@td/components-common/src/select/optionGroup';
import type { SelectOption, TdOptionGroupProps, TdOptionProps, TdSelectProps } from './type';

import '@td/components-common/src/select/style';

export * from './type';
export type SelectProps<T = SelectOption> = TdSelectProps<T>;
export type OptionProps = TdOptionProps;
export type OptionGroupProps = TdOptionGroupProps;

export const Select = withInstall(_Select);
export const Option = withInstall(_Option);
export const OptionGroup = withInstall(_OptionGroup);

export default Select;

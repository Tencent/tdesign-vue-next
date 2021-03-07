import Select from './select.vue';
import OptionGroup from './optionGroup.vue';
import Option from './option.vue';
import setInstallFn from '../utils/setInstallFn';
import { TdSelectProps } from '@TdTypes/select/TdSelectProps';

setInstallFn('Select', Select);
setInstallFn('Option', Option);
setInstallFn('OptionGroup', OptionGroup);

export type SelectProps = TdSelectProps;

export { Select, OptionGroup, Option };

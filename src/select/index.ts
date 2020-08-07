import Select from './select.vue';
import OptionGroup from './optionGroup.vue';
import Option from './option.vue';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('Select', Select);
setInstallFn('Option', Option);
setInstallFn('OptionGroup', OptionGroup);

export { Select, OptionGroup, Option };

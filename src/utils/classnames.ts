import config from '../config';

const { prefix } = config;

export const CLASSNAME_SIZE = {
  default: '',
  xs: `${prefix}-size-xs`,
  small: `${prefix}-size-s`,
  medium: `${prefix}-size-m`,
  // middle is going to be deprecated. please use medium
  middle: `${prefix}-size-m`,
  large: `${prefix}-size-l`,
  xl: `${prefix}-size-xl`,
  block: `${prefix}-size-full-width`,
};

export const CLASSNAME_STATUS = {
  loading: `${prefix}-is-loading`,
  disabled: `${prefix}-is-disabled`,
  focused: `${prefix}-is-focused`,
  success: `${prefix}-is-success`,
  error: `${prefix}-is-error`,
  warning: `${prefix}-is-warning`,
  selected: `${prefix}-is-selected`,
  active: `${prefix}-is-active`,
  checked: `${prefix}-is-checked`,
  current: `${prefix}-is-current`,
  hidden: `${prefix}-is-hidden`,
  visible: `${prefix}-is-visible`,
  expanded: `${prefix}-is-expanded`,
  indeterminate: `${prefix}-is-indeterminate`,
};

export default {
  SIZE: CLASSNAME_SIZE,
  STATUS: CLASSNAME_STATUS,
};

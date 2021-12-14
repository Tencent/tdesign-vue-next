import { prefix } from '../config';

export const SIZE_CLASSNAMES = {
  small: `${prefix}-size-s`,
  medium: `${prefix}-size-m`,
  large: `${prefix}-size-l`,
  default: '',
  xs: `${prefix}-size-xs`,
  xl: `${prefix}-size-xl`,
  block: `${prefix}-size-full-width`,
};

export const STATUS_CLASSNAMES = {
  loading: `${prefix}-is-loading`,
  loadMore: `${prefix}-is-load-more`,
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

const ClASSNAMES = {
  SIZE: SIZE_CLASSNAMES,
  STATUS: STATUS_CLASSNAMES,
};

export default ClASSNAMES;

import config from '../config';

const { prefix } = config;
const ClASSNAMES = {
  SIZE: {
    default: '',
    xs: `${prefix}-size-xs`,
    small: `${prefix}-size-s`,
    middle: `${prefix}-size-m`,
    large: `${prefix}-size-l`,
    xl: `${prefix}-size-xl`,
    block: `${prefix}-size-full-width`,
  },
  STATUS: {
    loading: `${prefix}-is-loading`,
    disabled: `${prefix}-is-disabled`,
    focused: `${prefix}-is-focused`,
    success: `${prefix}-is-success`,
    error: `${prefix}-is-error`,
    warning: `${prefix}-is-warning`,
    selected: `${prefix}-is-selected`,
    active: `${prefix}-is-active`,
    current: `${prefix}-is-current`,
    hidden: `${prefix}-is-hidden`,
    visible: `${prefix}-is-visible`,
    expanded: `${prefix}-is-expanded`,
  },
};

export default ClASSNAMES;

import config from '../config';

const { prefix } = config;
const ClASSNAMES = {
  SIZE: {
    large: `${prefix}-size-l`,
    default: '',
    small: `${prefix}-size-m`,
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

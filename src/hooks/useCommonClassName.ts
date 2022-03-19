import { useConfig } from '../config-provider/useConfig';

export default function useCommonClassName() {
  const { classPrefix: prefix } = useConfig();

  const sizeClassNames = {
    small: `${prefix}-size-s`,
    medium: `${prefix}-size-m`,
    large: `${prefix}-size-l`,
    default: '',
    xs: `${prefix}-size-xs`,
    xl: `${prefix}-size-xl`,
    block: `${prefix}-size-full-width`,
  };

  const statusClassNames = {
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
  return {
    sizeClassNames,
    statusClassNames,
    classNames: {
      size: sizeClassNames,
      status: statusClassNames,
    },
  };
}

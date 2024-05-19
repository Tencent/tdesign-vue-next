import { useConfig } from './useConfig';

export default function useCommonClassName() {
  const { classPrefix } = useConfig();

  const sizeClassNames = {
    small: `${classPrefix.value}-size-s`,
    medium: `${classPrefix.value}-size-m`,
    large: `${classPrefix.value}-size-l`,
    default: '',
    xs: `${classPrefix.value}-size-xs`,
    xl: `${classPrefix.value}-size-xl`,
    block: `${classPrefix.value}-size-full-width`,
  };

  const statusClassNames = {
    loading: `${classPrefix.value}-is-loading`,
    loadMore: `${classPrefix.value}-is-load-more`,
    disabled: `${classPrefix.value}-is-disabled`,
    focused: `${classPrefix.value}-is-focused`,
    success: `${classPrefix.value}-is-success`,
    error: `${classPrefix.value}-is-error`,
    warning: `${classPrefix.value}-is-warning`,
    selected: `${classPrefix.value}-is-selected`,
    active: `${classPrefix.value}-is-active`,
    checked: `${classPrefix.value}-is-checked`,
    current: `${classPrefix.value}-is-current`,
    hidden: `${classPrefix.value}-is-hidden`,
    visible: `${classPrefix.value}-is-visible`,
    expanded: `${classPrefix.value}-is-expanded`,
    indeterminate: `${classPrefix.value}-is-indeterminate`,
  };
  return {
    classPrefix,
    sizeClassNames,
    statusClassNames,
    classNames: {
      size: sizeClassNames,
      status: statusClassNames,
    },
  };
}

export type CommonClassNameType = ReturnType<typeof useCommonClassName>;

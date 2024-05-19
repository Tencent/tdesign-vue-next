import { computed } from 'vue';
import { useConfig } from '../config-provider/useConfig';

export function usePrefixClass(componentName?: string) {
  const { classPrefix } = useConfig('classPrefix');
  return computed(() => {
    return componentName ? `${classPrefix.value}-${componentName}` : classPrefix.value;
  });
}

export function useCommonClassName() {
  const { classPrefix } = useConfig('classPrefix');

  return {
    SIZE: computed(() => ({
      small: `${classPrefix.value}-size-s`,
      medium: `${classPrefix.value}-size-m`,
      large: `${classPrefix.value}-size-l`,
      default: '',
      xs: `${classPrefix.value}-size-xs`,
      xl: `${classPrefix.value}-size-xl`,
      block: `${classPrefix.value}-size-full-width`,
    })),
    STATUS: computed(() => ({
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
    })),
  };
}

export { useConfig };

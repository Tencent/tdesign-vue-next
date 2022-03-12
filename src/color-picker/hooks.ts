import { computed } from 'vue';
import { usePrefixClass } from '..';

const BASE_COMPONENT_NAME = 'color-picker';

/**
 * 基础样式
 * @param className
 * @returns
 */
export const useBaseClassName = (className?: string) => {
  const baseClassName = usePrefixClass(BASE_COMPONENT_NAME);
  return computed(() => (className ? `${baseClassName.value}-${className}` : baseClassName.value));
};

/**
 * 状态类样式
 * @returns
 */
export const useStatusClassName = () => {
  const prefix = usePrefixClass();
  return {
    disabledClassName: `${prefix.value}-is-disabled`,
    activeClassName: `${prefix.value}-is-active`,
    currentClassName: `${prefix.value}-is-current`,
    inlineClassName: `${prefix.value}-is-inline`,
  };
};

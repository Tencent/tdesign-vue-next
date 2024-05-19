import { computed } from '@td/adapter-vue';
import { usePrefixClass } from '@td/adapter-hooks';

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

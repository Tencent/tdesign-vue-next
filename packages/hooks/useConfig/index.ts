import { computed } from 'vue';
// TODO need refactor
import { useConfig } from '../../components/config-provider/hooks/useConfig';

export function usePrefixClass(componentName?: string) {
  const { classPrefix } = useConfig('classPrefix');
  return computed(() => {
    return componentName ? `${classPrefix.value}-${componentName}` : classPrefix.value;
  });
}

export { useConfig };

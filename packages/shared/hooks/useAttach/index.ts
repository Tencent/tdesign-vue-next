import { computed } from 'vue';
import { useGlobalConfig } from '../useConfig';
import type { AttachNode } from '../../../components/common';

type AttachComponent = 'dialog' | 'drawer' | 'popup' | 'imageViewer';

export function useAttach(component: AttachComponent, getAttach: () => AttachNode, defaultAttach?: AttachNode) {
  const globalConfig = useGlobalConfig();

  return computed(() => {
    const attach = getAttach();
    // 空字符串仍是显式配置，不能被全局值覆盖。
    if (attach !== undefined) return attach;

    const globalAttach = globalConfig.value.attach;
    if (typeof globalAttach === 'string' || typeof globalAttach === 'function') return globalAttach;

    return globalAttach?.[component] ?? defaultAttach;
  });
}

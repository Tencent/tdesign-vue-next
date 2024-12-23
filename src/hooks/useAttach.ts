import { computed } from 'vue';
import { useConfig } from './useConfig';
import type { AttachNode } from '../common';

const defaultAttach = 'body';
/**
 * useAttach
 *
 * 挂载节点 优先级:
 *
 * props attach -> globalConfig.attach.component -> globalConfig.attach -> default = 'body'
 */
const useAttach = (name: string, attach: AttachNode) => {
  const globalAttachConfig = useConfig('attach');

  const attachVal = computed(() => attach || globalAttachConfig?.[name] || globalAttachConfig || defaultAttach);

  return attachVal;
};

export default useAttach;

import { getSSRAttach, getAttach } from '../utils/dom';
import { computed, Ref, onMounted, ref, watch } from 'vue';
import { AttachNode } from '../common';

/**
 * @description 返回挂载的节点, 用于teleport
 * @param attach AttachGetter
 * @param triggerNode triggerNodeRef
 */
const useTeleport = (attach: () => AttachNode, triggerNode?: Ref<any>): Ref<string | Element> => {
  const to = computed(attach);

  const element = ref<string | Element>();

  const getElement = () => {
    element.value = getSSRAttach() || getAttach(to.value, triggerNode?.value);
  };

  onMounted(() => getElement());

  // 监听to变化,重新获取挂载节点; triggerNode可能为undefined, 所以使用Getter
  watch([to, () => triggerNode?.value], () => getElement());

  return element;
};

export default useTeleport;

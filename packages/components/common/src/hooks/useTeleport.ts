import type { Ref } from '@td/adapter-vue';
import { computed, onMounted, ref, watch } from '@td/adapter-vue';
import { isFunction } from 'lodash-es';
import type { AttachNode } from '@td/types';
import { getAttach, getSSRAttach } from '@td/utils';

/**
 * @description 返回挂载的节点, 用于teleport
 * @param attach 既可以是一个函数, 也可以是一个ref
 * @param triggerNode 既可以是一个函数, 也可以是一个ref
 */
function useTeleport(attach: (() => AttachNode) | Ref<AttachNode>, triggerNode?: (() => any) | Ref<any>): Ref<string | Element> {
  // 如果是函数, 则使用computed包裹 否则直接使用ref
  const to = isFunction(attach) ? computed(attach) : ref(attach);
  const innerTriggerNode = isFunction(triggerNode) ? computed(triggerNode) : ref(triggerNode);

  const element = ref<string | Element>();

  const getElement = () => {
    element.value = getSSRAttach() || getAttach(to.value, innerTriggerNode.value);
  };

  onMounted(() => getElement());

  watch([to, innerTriggerNode], () => getElement());

  return element;
}

export default useTeleport;

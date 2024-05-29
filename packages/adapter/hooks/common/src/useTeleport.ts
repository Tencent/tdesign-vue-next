import { isFunction } from 'lodash-es';

import { getAttach } from '@td/utils';
import type { AttachNode } from '@td/types';
import type { Ref } from '@td/adapter-vue';
import { computed, onMounted, ref, watch } from '@td/adapter-vue';

/**
 * @description 返回挂载的节点, 用于teleport
 * @param attach 既可以是一个函数, 也可以是一个ref
 * @param triggerNode 既可以是一个函数, 也可以是一个ref
 */
export function useTeleport(attach: (() => AttachNode) | Ref<AttachNode>, triggerNode?: (() => any) | Ref<any>): Ref<Element> {
  // 如果是函数, 则使用computed包裹 否则直接使用ref
  const to = isFunction(attach) ? computed(attach) : ref(attach);
  const innerTriggerNode = isFunction(triggerNode) ? computed(triggerNode) : ref(triggerNode);

  const element = ref<Element>(document.body);
  const getElement = () => element.value = getAttach(to.value, innerTriggerNode.value) || document.body;

  onMounted(getElement);

  watch([to, innerTriggerNode], getElement);

  return element;
}

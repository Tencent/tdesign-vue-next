import { ComponentPublicInstance } from 'vue';

function findTopNode(vm: ComponentPublicInstance): ComponentPublicInstance {
  // 找到t-transfer这层父节点
  if (vm.$options.name === 't-transfer') {
    return vm;
  }
  if (vm.$parent) {
    return findTopNode(vm.$parent);
  }
  return vm;
}

export { findTopNode };

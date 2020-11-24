import Vue from 'vue';

function findTopNode(vm: Vue): Vue {
  // 找到t-transfer这层父节点
  if (vm.$options.name === 't-transfer') {
    return vm;
  } if (vm.$parent) {
    return findTopNode(vm.$parent);
  }
  return vm;
}

export { findTopNode };

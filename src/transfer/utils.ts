import { ComponentPublicInstance } from 'vue';
import { TransferListOptionBase } from './interface';

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

function getTransferListOption<T>(prop: T | Array<T>): TransferListOptionBase<T> {
  if (Array.isArray(prop)) {
    return {
      source: prop[0],
      target: prop[1],
    };
  }
  return {
    source: prop,
    target: prop,
  };
}

export { findTopNode, getTransferListOption };

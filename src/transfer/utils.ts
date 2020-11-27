import Vue from 'vue';

function findTopNode(vm: Vue): Vue {
  // 找到t-transfer这层父节点
  if (vm.$options.name === 't-transfer') {
    return vm;
  }
  if (vm.$parent) {
    return findTopNode(vm.$parent);
  }
  return vm;
}

/**
 * @description: 深复制对象, 利用JSON序列化实现一个深拷贝,继承的属性会丢失
 * @param {Object} obj 必选
 * @return: {Object} 返回复制的新对象
 */
function deepCloneByJson(obj: object) {
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj));
  }
  return obj;
}

export { findTopNode, deepCloneByJson };

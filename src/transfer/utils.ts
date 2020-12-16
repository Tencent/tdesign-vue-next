/*
 * @Description:
 * @Author: smileswlin
 * @LastEditor: smileswlin
 * @Date: 2020-12-14 21:43:02
 * @LastEditTime: 2020-12-15 22:41:25
 */
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

export { findTopNode };

// 通过JSX的方式渲染TNode
export const renderTNodeJSX = (vm: Vue, name: string) => {
  const propsNode = vm[name];
  if (typeof propsNode === 'function') return propsNode(vm.$createElement);
  if (!propsNode && vm.$scopedSlots[name]) return vm.$scopedSlots[name](null);
  return propsNode;
};

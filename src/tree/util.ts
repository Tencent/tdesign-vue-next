import { VNode } from 'vue';


export function getParentNodes(element?: HTMLElement, parent?: HTMLElement): Array<HTMLElement> {
  const parents = [];
  let el: any = element;
  while (el && el.parentNode) {
    parents.push(el);
    if (el === parent) {
      break;
    }
    el = el.parentNode;
  }
  return parents;
};

export function getTNode(prop: any, options: any): string | VNode {
  let tnode = null;
  let item = null;
  if (typeof prop === 'function') {
    item = prop(options);
  }
  if (typeof item === 'string') {
    tnode = item;
  } else if (item) {
    tnode = item as VNode;
  }
  return tnode;
}

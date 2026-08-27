import type { VNode } from 'vue';

export const getVNodeText = (node: VNode) => {
  if (typeof node.children === 'string') return node.children;
  if (!Array.isArray(node.children)) return '';
  return node.children.map((child) => (typeof child === 'string' ? child : (child as VNode).children)).join('');
};

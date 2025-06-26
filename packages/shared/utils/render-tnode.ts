import { VNode, isVNode, Fragment } from 'vue';
import { isArray, isString, isObject } from 'lodash-es';

// TODO:PAOPAO move? i have no idea
export interface JSXRenderContext {
  defaultNode?: VNode | string;
  params?: Record<string, any>;
  slotFirst?: boolean;
  // 是否不打印 LOG
  silent?: boolean;
}

export type OptionsType = VNode | JSXRenderContext | string;

export function getDefaultNode(options?: OptionsType) {
  let defaultNode;
  if (isObject(options) && 'defaultNode' in options) {
    defaultNode = options.defaultNode;
  } else if (isVNode(options) || isString(options)) {
    defaultNode = options;
  }
  return defaultNode;
}

export function getChildren(content: VNode[]) {
  const childList: VNode[] = [];
  const innerGetChildren = (content: VNode[]) => {
    if (!isArray(content)) return;
    content.forEach((item: VNode) => {
      if (item.children && isArray(item.children)) {
        if (item.type !== Fragment) return;
        innerGetChildren(item.children as VNode[]);
      } else {
        childList.push(item);
      }
    });
    return childList;
  };

  return innerGetChildren(content);
}

// TODO:PAOPAO looks like a common util??
export function getParams(options?: OptionsType) {
  // TODO:PAOPAO in ??? in my view, it is better to use hasOwnProperty instead of in if it is not necessary.
  return isObject(options) && 'params' in options ? options.params : {};
}

// TODO:PAOPAO as above
// and only hooks tnode import this one, so, can we move it to tnode hooks directly????
export function getSlotFirst(options?: OptionsType): boolean {
  return isObject(options) && 'slotFirst' in options ? options.slotFirst : false;
}

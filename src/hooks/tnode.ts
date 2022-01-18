import { h, getCurrentInstance, VNode, isVNode } from 'vue';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';

interface JSXRenderContext {
  defaultNode?: VNode | string;
  params?: Record<string, any>;
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

export function getParams(options?: OptionsType) {
  return isObject(options) && 'params' in options ? options.params : null;
}

/**
 * 用于setup的TNodeJSX，在组合时逻辑时渲染 TNode，props 和 插槽同时处理，也能处理默认值为 true 则渲染默认节点的情况，与render-tnode的大概处理逻辑相同。
 * @param name 插槽和属性名称
 * @param options 值可能为默认渲染节点，也可能是默认渲染节点和参数的集合
 * @example useTNodeJSX('closeBtn')  优先级 props function 大于 插槽
 * @example useTNodeJSX('closeBtn', <close-icon />)。 当属性值为 true 时则渲染 <close-icon />
 * @example useTNodeJSX('closeBtn', { defaultNode: <close-icon />, params })。 params 为渲染节点时所需的参数
 */

export const useTNodeJSX = (name: string, options?: OptionsType) => {
  // assemble params && defaultNode
  const params = getParams(options);
  const defaultNode = getDefaultNode(options);

  const instance = getCurrentInstance();

  // 处理 props 类型的Node
  let propsNode;
  if (Object.keys(instance).includes(name)) {
    propsNode = instance[name];
  }

  // propsNode 为 false 不渲染
  if (propsNode === false) return;

  // 同名function和slot优先处理插槽
  if (instance.slots[name]) {
    return instance.slots[name](params);
  }
  if (isFunction(propsNode)) return propsNode(h, params);

  // propsNode为true则渲染defaultNode
  if (propsNode === true && defaultNode) {
    return defaultNode;
  }
  // 处理字符串类型的 propsNode
  return propsNode;
};

/**
 * 在setup中，通过JSX的方式 TNode，props 和 插槽同时处理。与 renderTNodeJSX 区别在于属性值为 undefined 时会渲染默认节点
 * @param name 插槽和属性名称
 * @example useTNodeDefault('closeBtn')
 * @example useTNodeDefault('closeBtn', <close-icon />) closeBtn 为空时，则兜底渲染 <close-icon />
 * @example useTNodeDefault('closeBtn', { defaultNode: <close-icon />, params }) 。params 为渲染节点时所需的参数
 */
export const useTNodeDefault = (name: string, options?: VNode | JSXRenderContext) => {
  const defaultNode = getDefaultNode(options);
  return useTNodeJSX(name, options) || defaultNode;
};

/**
 * 在setup中，用于处理相同名称的 TNode 渲染
 * @param name1 第一个名称，优先级高于 name2
 * @param name2 第二个名称
 * @param defaultNode 默认渲染内容：当 name1 和 name2 都为空时会启动默认内容渲染
 * @example useContent('default', 'content')
 * @example useContent('default', 'content', '我是默认内容')
 * @example useContent('default', 'content', { defaultNode: '我是默认内容', params })
 */
export const useContent = (name1: string, name2: string, options?: VNode | JSXRenderContext) => {
  // assemble params && defaultNode
  const params = getParams(options);
  const defaultNode = getDefaultNode(options);

  const toParams = params ? { params } : undefined;

  const node1 = useTNodeJSX(name1, toParams);
  const node2 = useTNodeJSX(name2, toParams);

  const res = isEmpty(node1) ? node2 : node1;
  return isEmpty(res) ? defaultNode : res;
};

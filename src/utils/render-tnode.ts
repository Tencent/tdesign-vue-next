/* eslint-disable no-undef */
import { h, isVNode, VNode, ComponentPublicInstance, Slots } from 'vue';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

interface JSXRenderContext {
  defaultNode?: VNode;
  params?: Record<string, any>;
}

type OptionsType = VNode | JSXRenderContext;

function getDefaultNode(options?: OptionsType) {
  const params = isObject(options) && 'params' in options ? options.params : null;

  let defaultNode;
  if (isObject(options) && 'defaultNode' in options) {
    defaultNode = options.defaultNode;
  } else if (isVNode(options)) {
    defaultNode = options;
  }

  return {
    params,
    defaultNode,
  };
}

function getParams(options?: OptionsType) {
  return isObject(options) && 'params' in options ? options.params : null;
}

/**
 * 通过JSX的方式渲染 TNode，props 和 插槽同时处理，也能处理默认值为 true 则渲染默认节点的情况
 * @param vm 组件实例
 * @param name 插槽和属性名称
 * @param options 值可能为默认渲染节点，也可能是默认渲染节点和参数的集合
 * @example renderTNodeJSX(this, 'closeBtn')  优先级 props function 大于 插槽
 * @example renderTNodeJSX(this, 'closeBtn', <close-icon />)。 当属性值为 true 时则渲染 <close-icon />
 * @example renderTNodeJSX(this, 'closeBtn', { defaultNode: <close-icon />, params })。 params 为渲染节点时所需的参数
 */

export const renderTNodeJSX = (
  instance: ComponentPublicInstance,
  name: string,
  options?: Slots | JSXRenderContext | JSX.Element,
) => {
  // assemble params && defaultNode
  const params = getParams(options);
  const defaultNode = getDefaultNode(options);

  // 处理 props 类型的Node
  let propsNode;
  if (name in instance) {
    propsNode = instance[name];
  }

  // propsNode 为 false 不渲染
  if (propsNode === false) return;

  // 同名优先处理插槽
  if (instance.$slots[name]) {
    return instance.$slots[name](params);
  }
  if (propsNode === true && defaultNode) {
    return instance.$slots[name] ? instance.$slots[name](params) : defaultNode;
  }
  if (isFunction(propsNode)) return propsNode(h, params);

  if (propsNode === true && defaultNode) {
    return defaultNode;
  }
};

/**
 * 通过JSX的方式渲染 TNode，props 和 插槽同时处理。与 renderTNodeJSX 区别在于 属性值为 undefined 时会渲染默认节点
 * @param vm 组件实例
 * @param name 插槽和属性名称
 * @example renderTNodeJSX(this, 'closeBtn')
 * @example renderTNodeJSX(this, 'closeBtn', <close-icon />)。this.closeBtn 为空时，则兜底渲染 <close-icon />
 * @example renderTNodeJSX(this, 'closeBtn', { defaultNode: <close-icon />, params }) 。params 为渲染节点时所需的参数
 */
export const renderTNodeJSXDefault = (
  vm: ComponentPublicInstance,
  name: string,
  options?: Slots | JSXRenderContext | JSX.Element,
) => {
  const defaultNode = getDefaultNode(options);
  return renderTNodeJSX(vm, name, options) || defaultNode;
};

/**
 * 用于处理相同名称的 TNode 渲染
 * @param vm 组件实例
 * @param name1 第一个名称，优先级高于 name2
 * @param name2 第二个名称
 * @param defaultNode 默认渲染内容：当 name1 和 name2 都为空时会启动默认内容渲染
 * @example renderContent(this, 'default', 'content')
 * @example renderContent(this, 'default', 'content', '我是默认内容')
 * @example renderContent(this, 'default', 'content', { defaultNode: '我是默认内容', params })
 */
export const renderContent = (
  vm: ComponentPublicInstance,
  name1: string,
  name2: string,
  options?: VNode | JSXRenderContext | JSX.Element,
) => {
  const params = getParams(options);
  const defaultNode = getDefaultNode(options);

  const toParams = params ? { params } : undefined;

  const node1 = renderTNodeJSX(vm, name1, toParams);
  const node2 = renderTNodeJSX(vm, name2, toParams);

  const res = isEmpty(node1) ? node2 : node1;
  return isEmpty(res) ? defaultNode : res;
};

import { h, ComponentPublicInstance, VNode, isVNode } from 'vue';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';

export interface JSXRenderContext {
  defaultNode?: VNode | string;
  params?: Record<string, any>;
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

export function getParams(options?: OptionsType) {
  return isObject(options) && 'params' in options ? options.params : {};
}

// 同时支持驼峰命名和中划线命名的插槽，示例：value-display 和 valueDisplay
export function handleSlots(instance: ComponentPublicInstance, params: Record<string, any>, name: string) {
  // 检查是否存在 驼峰命名 的插槽
  let node = instance.$slots[camelCase(name)]?.(params);
  if (node) return node;
  // 检查是否存在 中划线命名 的插槽
  node = instance.$slots[kebabCase(name)]?.(params);
  if (node) return node;
  return null;
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
export const renderTNodeJSX = (instance: ComponentPublicInstance, name: string, options?: OptionsType) => {
  // assemble params && defaultNode
  const params = getParams(options);
  const defaultNode = getDefaultNode(options);

  // 处理 props 类型的Node
  let propsNode;
  if (name in instance) {
    propsNode = instance[name];
  }

  // 是否静默日志
  // const isSilent = Boolean(isObject(options) && 'silent' in options && options.silent);
  // // 同名插槽和属性同时存在，则提醒用户只需要选择一种方式即可
  // if (instance.$slots[name] && propsNode && propsNode !== true && !isSilent) {
  //   console.warn(`Both $slots.${name} and $props.${name} exist, $props.${name} is preferred`);
  // }

  // propsNode 为 false 不渲染
  if (propsNode === false) return;
  if (propsNode === true && defaultNode) {
    return handleSlots(instance, params, name) || defaultNode;
  }

  // 同名 props 和 slot 优先处理 props
  if (isFunction(propsNode)) return propsNode(h, params);
  const isPropsEmpty = [undefined, params, ''].includes(propsNode);
  // Props 为空，但插槽存在
  if (isPropsEmpty && (instance.$slots[camelCase(name)] || instance.$slots[kebabCase(name)])) {
    return handleSlots(instance, params, name);
  }
  return propsNode;
};

/**
 * 通过JSX的方式渲染 TNode，props 和 插槽同时处理。与 renderTNodeJSX 区别在于 属性值为 undefined 时会渲染默认节点
 * @param vm 组件实例
 * @param name 插槽和属性名称
 * @example renderTNodeJSX(this, 'closeBtn')
 * @example renderTNodeJSX(this, 'closeBtn', <close-icon />)。this.closeBtn 为空时，则兜底渲染 <close-icon />
 * @example renderTNodeJSX(this, 'closeBtn', { defaultNode: <close-icon />, params }) 。params 为渲染节点时所需的参数
 */
export const renderTNodeJSXDefault = (vm: ComponentPublicInstance, name: string, options?: OptionsType) => {
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
export const renderContent = (vm: ComponentPublicInstance, name1: string, name2: string, options?: OptionsType) => {
  const params = getParams(options);
  const defaultNode = getDefaultNode(options);

  const toParams = params ? { params } : undefined;

  const node1 = renderTNodeJSX(vm, name1, toParams);
  const node2 = renderTNodeJSX(vm, name2, toParams);

  const res = isEmpty(node1) ? node2 : node1;
  return isEmpty(res) ? defaultNode : res;
};

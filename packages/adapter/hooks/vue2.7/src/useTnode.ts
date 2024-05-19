import { H, getCurrentInstance } from '@td/adapter-vue';
import type { SetupContext, VNode } from '@td/adapter-vue';
// import { h, getCurrentInstance, ComponentInternalInstance, VNode } from 'vue';
import { camelCase, isEmpty, isFunction, kebabCase } from 'lodash-es';
import { getDefaultNode, getParams } from './useRenderTNode';
import type { JSXRenderContext, OptionsType } from './useRenderTNode';
// import log from '@td/shared/_common/js/log';

// 兼容处理插槽名称，同时支持驼峰命名和中划线命名，示例：value-display 和 valueDisplay
function handleSlots(slots: SetupContext['slots'], name: string, params: Record<string, any>) {
  const finaleParams = H;
  if (params) {
    Object.assign(finaleParams, params);
  }
  // 检查是否存在 驼峰命名 的插槽
  let node = slots[camelCase(name)]?.(finaleParams);
  if (node) {
    return node;
  }
  // 检查是否存在 中划线命名 的插槽
  node = slots[kebabCase(name)]?.(finaleParams);
  if (node) {
    return node;
  }
  return null;
}

/**
 * 通过 JSX 的方式渲染 TNode，props 和 插槽同时处理，也能处理默认值为 true 则渲染默认节点的情况
 * 优先级：Props 大于插槽
 * 如果 props 值为 true ，则使用插槽渲染。如果也没有插槽的情况下，则使用 defaultNode 渲染
 * @example const renderTNodeJSX = useTNodeJSX()
 * @return () => {}
 * @param name 插槽和属性名称
 * @param options 值可能为默认渲染节点，也可能是默认渲染节点和参数的集合
 * @example renderTNodeJSX('closeBtn')  优先级 props function 大于 插槽
 * @example renderTNodeJSX('closeBtn', <close-icon />)。 当属性值为 true 时则渲染 <close-icon />
 * @example renderTNodeJSX('closeBtn', { defaultNode: <close-icon />, params })。 params 为渲染节点时所需的参数
 */
export function useTNodeJSX() {
  return function (name: string, options?: OptionsType) {
    const instance = getCurrentInstance();
    // assemble params && defaultNode
    const params = getParams(options);
    const defaultNode = getDefaultNode(options);

    // 处理 props 类型的Node
    let propsNode;
    if (Object.keys(instance?.props || {}).includes(name)) {
      propsNode = instance?.props[name];
    }
    // 同名插槽和属性同时存在，则提醒用户只需要选择一种方式即可
    // if (slots[name] && propsNode && propsNode !== true) {
    //   log.warn('', `Both slots.${name} and props.${name} exist, props.${name} is preferred`);
    // }
    // propsNode 为 false 不渲染
    if (propsNode === false) {
      return;
    }
    if (propsNode === true) {
      return handleSlots(instance?.$scopedSlots, name, params) || defaultNode;
    }

    // 同名 props 和 slot 优先处理 props
    if (isFunction(propsNode)) {
      // TODO
      return propsNode(H, params);
    }
    const isPropsEmpty = [undefined, params, ''].includes(propsNode);
    if (isPropsEmpty && (instance?.$scopedSlots[camelCase(name)] || instance?.$scopedSlots[kebabCase(name)])) {
      return handleSlots(instance?.$scopedSlots, name, params);
    }
    return propsNode;
  };
}

/**
 * 在setup中，通过JSX的方式 TNode，props 和 插槽同时处理。与 renderTNodeJSX 区别在于属性值为 undefined 时会渲染默认节点
 * @example const renderTNodeJSXDefault = useTNodeDefault()
 * @return () => {}
 * @param name 插槽和属性名称
 * @example renderTNodeJSXDefault('closeBtn')
 * @example renderTNodeJSXDefault('closeBtn', <close-icon />) closeBtn 为空时，则兜底渲染 <close-icon />
 * @example renderTNodeJSXDefault('closeBtn', { defaultNode: <close-icon />, params }) 。params 为渲染节点时所需的参数
 */
export function useTNodeDefault() {
  const renderTNodeJSX = useTNodeJSX();
  return function (name: string, options?: VNode | JSXRenderContext) {
    const defaultNode = getDefaultNode(options);
    return renderTNodeJSX(name, options) || defaultNode;
  };
}

/**
 * 在setup中，用于处理相同名称的 TNode 渲染
 * @example const renderContent = useContent()
 * @return () => {}
 * @param name1 第一个名称，优先级高于 name2
 * @param name2 第二个名称
 * @param defaultNode 默认渲染内容：当 name1 和 name2 都为空时会启动默认内容渲染
 * @example renderContent('default', 'content')
 * @example renderContent('default', 'content', '我是默认内容')
 * @example renderContent('default', 'content', { defaultNode: '我是默认内容', params })
 */
export function useContent() {
  const renderTNodeJSX = useTNodeJSX();
  return function (name1: string, name2: string, options?: VNode | JSXRenderContext) {
    // assemble params && defaultNode
    const params = getParams(options);
    const defaultNode = getDefaultNode(options);

    const toParams = params ? { params } : undefined;

    const node1 = renderTNodeJSX(name1, toParams);
    const node2 = renderTNodeJSX(name2, toParams);

    const res = isEmpty(node1) ? node2 : node1;
    return isEmpty(res) ? defaultNode : res;
  };
}

import { h, getCurrentInstance, ComponentInternalInstance, VNode } from 'vue';
import isFunction from 'lodash/isFunction';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import { getDefaultNode, getParams, OptionsType, JSXRenderContext, getSlotFirst } from '../utils/render-tnode';

// 兼容处理插槽名称，同时支持驼峰命名和中划线命名，示例：value-display 和 valueDisplay
function handleSlots(instance: ComponentInternalInstance, name: string, params: Record<string, any>) {
  // 每个 slots 需要单独的 h 函数 否则直接assign会重复把不同 slots 的 params 都注入
  const finalParams = new Function('return ' + h.toString())();
  if (params) {
    Object.assign(finalParams, params);
  }
  // 检查是否存在 驼峰命名 的插槽（过滤注释节点）
  let node = instance.slots[camelCase(name)]?.(finalParams);
  if (node && node.filter((t) => t.type.toString() !== 'Symbol(v-cmt)').length) return node;
  // 检查是否存在 中划线命名 的插槽
  node = instance.slots[kebabCase(name)]?.(finalParams);
  if (node && node.filter((t) => t.type.toString() !== 'Symbol(v-cmt)').length) return node;
  return null;
}

/**
 * 是否为空节点，需要过滤掉注释节点。注释节点也会被认为是空节点
 */
function isEmptyNode(node: any) {
  if ([undefined, null, ''].includes(node)) return true;
  const innerNodes = node instanceof Array ? node : [node];
  const r = innerNodes.filter((node) => node?.type?.toString() !== 'Symbol(Comment)');
  return !r.length;
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
export const useTNodeJSX = () => {
  const instance = getCurrentInstance();
  return function (name: string, options?: OptionsType) {
    // assemble params && defaultNode
    const params = getParams(options);
    const defaultNode = getDefaultNode(options);
    const slotFirst = getSlotFirst(options);

    // 处理 props 类型的Node
    let propsNode;
    if (Object.keys(instance.props).includes(name)) {
      propsNode = instance.props[name];
    }

    // 是否静默日志
    // const isSilent = Boolean(isObject(options) && 'silent' in options && options.silent);
    // // 同名插槽和属性同时存在，则提醒用户只需要选择一种方式即可
    // if (instance.slots[name] && propsNode && propsNode !== true && !isSilent) {
    //   log.warn('', `Both slots.${name} and props.${name} exist, props.${name} is preferred`);
    // }
    // propsNode 为 false 不渲染
    if (propsNode === false) return;
    if (propsNode === true) {
      return handleSlots(instance, name, params) || defaultNode;
    }

    // 同名 props 和 slot 优先处理 props
    if (isFunction(propsNode)) return propsNode(h, params);
    const isPropsEmpty = [undefined, params, ''].includes(propsNode);
    if ((isPropsEmpty || slotFirst) && (instance.slots[camelCase(name)] || instance.slots[kebabCase(name)])) {
      return handleSlots(instance, name, params);
    }
    return propsNode;
  };
};

/**
 * 在setup中，通过JSX的方式 TNode，props 和 插槽同时处理。与 renderTNodeJSX 区别在于属性值为 undefined 时会渲染默认节点
 * @example const renderTNodeJSXDefault = useTNodeDefault()
 * @return () => {}
 * @param name 插槽和属性名称
 * @example renderTNodeJSXDefault('closeBtn')
 * @example renderTNodeJSXDefault('closeBtn', <close-icon />) closeBtn 为空时，则兜底渲染 <close-icon />
 * @example renderTNodeJSXDefault('closeBtn', { defaultNode: <close-icon />, params }) 。params 为渲染节点时所需的参数
 */
export const useTNodeDefault = () => {
  const renderTNodeJSX = useTNodeJSX();
  return function (name: string, options?: VNode | JSXRenderContext) {
    const defaultNode = getDefaultNode(options);
    return renderTNodeJSX(name, options) || defaultNode;
  };
};

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
export const useContent = () => {
  const renderTNodeJSX = useTNodeJSX();
  return function (name1: string, name2: string, options?: VNode | JSXRenderContext) {
    // assemble params && defaultNode
    const params = getParams(options);
    const defaultNode = getDefaultNode(options);

    const toParams = params ? { params } : undefined;

    const node1 = renderTNodeJSX(name1, toParams);
    const node2 = renderTNodeJSX(name2, toParams);

    const res = isEmptyNode(node1) ? node2 : node1;
    return isEmptyNode(res) ? defaultNode : res;
  };
};

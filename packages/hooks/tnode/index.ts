import { h, getCurrentInstance, ComponentInternalInstance, VNode } from 'vue';
import { isFunction } from 'lodash-es';
import { camelCase } from 'lodash-es';
import { kebabCase } from 'lodash-es';
// TODO need refactor
import {
  getDefaultNode,
  getParams,
  OptionsType,
  JSXRenderContext,
  getSlotFirst,
} from '../../components/utils/render-tnode';
import { hasOwn } from '@tdesign/common-js/utils/general';

// 兼容处理插槽名称，同时支持驼峰命名和中划线命名，示例：value-display 和 valueDisplay
function handleSlots(instance: ComponentInternalInstance, name: string, params: Record<string, any>) {
  // 2023-08 new Function 触发部分使用场景安全策略问题（Chrome插件/eletron等）
  // // 每个 slots 需要单独的 h 函数 否则直接assign会重复把不同 slots 的 params 都注入
  // const finalParams = new Function('return ' + h.toString())();
  // if (params) {
  //   Object.assign(finalParams, params);
  // }

  // 检查是否存在 驼峰命名 的插槽（过滤注释节点）
  let node = instance.slots[camelCase(name)]?.(params);
  if (node && node.filter((t) => t.type.toString() !== 'Symbol(v-cmt)').length) return node;
  // 检查是否存在 中划线命名 的插槽
  node = instance.slots[kebabCase(name)]?.(params);
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

// TODO 可以把这里移动到 utils 中
/**
 * 检查用户是否有主动传 prop
 * @param instance 组件实例
 * @param propName prop 名称
 * @returns boolean
 */
function isPropExplicitlySet(instance: ComponentInternalInstance, propName: string) {
  const vProps = instance?.vnode.props || {};
  return hasOwn(vProps, camelCase(propName)) || hasOwn(vProps, kebabCase(propName));
}

/**
/**
 * 通过 JSX 的方式渲染 TNode，props 和 插槽同时处理，也能处理默认值为 true 则渲染默认节点的情况
 * 优先级：用户注入的 props 值 > slot > 默认 props 值
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
    // 渲染节点时所需的参数
    const renderParams = getParams(options);
    // 默认渲染节点
    // TODO 这里需要讨论，这里的默认节点规则是什么呢？ pp test:unit image-viewer pp test:unit Collapse
    const defaultNode = getDefaultNode(options);
    // 是否显示设置 slot 优先
    const isSlotFirst = getSlotFirst(options);
    // 插槽
    const renderSlot = instance.slots[camelCase(name)] || instance.slots[kebabCase(name)];

    if (isSlotFirst && renderSlot) {
      // 1. 如果显示设置了 slot 优先，并且存在 slot，那么优先使用 slot
      return handleSlots(instance, name, renderParams);
    } else {
      // 2. 否者按照 用户主动传入的 props 值 > slot > 默认 props 值
      // 2.1 处理主动传入的 prop
      if (isPropExplicitlySet(instance, name)) {
        // 2.1.1 如果有传，那么优先使用 prop 的值
        const propsNode = instance.props[camelCase(name)] || instance.props[kebabCase(name)];
        // 2.1.2 如果 prop 的值为 false 或者 null，那么直接不渲染
        if (propsNode === false || propsNode === null) return;
        // 2.1.3 如果 prop 的值为 true，那么使用 slot 渲染
        if (propsNode === true) {
          return handleSlots(instance, name, renderParams) || defaultNode;
        }
        // 2.1.4 如果 prop 的值为函数，那么执行函数
        if (isFunction(propsNode)) return propsNode(h, renderParams);
        // 2.1.5 如果 prop 的值为 undefined、''，那么使用插槽渲染
        const isPropsEmpty = [undefined, ''].includes(propsNode as any);
        if (isPropsEmpty && renderSlot) {
          return handleSlots(instance, name, renderParams);
        }
        // 2.1.6 如果 prop 的值为其他值，那么直接返回
        return propsNode;
      }
      // 2.2 如果未主动传入 prop，那么渲染 slot，当然前提是存在 slot
      if (renderSlot) {
        return handleSlots(instance, name, renderParams);
      }
      // 2.3 如果未主动传入 prop，也没有 slot，那么就走 prop
      const propsNode = instance.props[camelCase(name)] || instance.props[kebabCase(name)];
      if (propsNode === false || propsNode === null) return;
      if (propsNode === true) {
        return defaultNode;
      }
      if (isFunction(propsNode)) return propsNode(h, renderParams);
      return propsNode;
    }
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

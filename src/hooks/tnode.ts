import { SetupContext, h } from 'vue';
import isFunction from 'lodash/isFunction';
import kebabCase from 'lodash/kebabCase';
import camelCase from 'lodash/camelCase';
import log from '../_common/js/log';

export interface UseTNodeJSXOptions<T> {
  // 因 getCurrentInstance 无法获取到插槽信息，所以需要 slots 参数
  slots: SetupContext['slots'];
  props: Object;
  defaultNode?: any;
  params?: T;
}

/**
 * 通过 JSX 的方式渲染 TNode，props 和 插槽同时处理，也能处理默认值为 true 则渲染默认节点的情况
 * 优先级：Props 大于插槽
 * 如果 props 值为 true ，则使用插槽渲染。如果也没有插槽的情况下，则使用 defaultNode 渲染
 * @param vm 组件实例
 * @param name 插槽和属性名称
 * @param options 值可能为默认渲染节点，也可能是默认渲染节点和参数的集合
 * @example useTNodeJSX('closeBtn', { slots })  优先级 props function 大于 插槽
 * @example useTNodeJSX('closeBtn', { defaultNode: <close-icon />, slots, params })。 params 为渲染节点时所需的参数
 */
export function useTNodeJSX<T>(name: string, options?: UseTNodeJSXOptions<T>) {
  const { props, slots } = options;
  const camelName = camelCase(name);
  const kebabName = kebabCase(name);
  // can not get slots and props from getCurrentInstance()
  const slotNode = slots[kebabName] || slots[camelName];
  const propsNode = props?.[camelName];
  // 同名插槽和属性同时存在，则提醒用户只需要选择一种方式即可
  if (slotNode && propsNode && propsNode !== true) {
    log.warn('', `Both slots.${name} and $props.${name} exist, $props.${name} is preferred`);
  }
  // props 值为 false，则表示无论何种情况都不显示元素
  if (propsNode === false) return null;
  if (propsNode === true) return slotNode?.(options?.params) || options?.defaultNode;
  // props 值类型为 Function，则表示使用渲染函数输出
  if (isFunction(propsNode)) return propsNode(h, options?.params);
  // props 为其他数据类型，只要不为空，则直接输出
  if (!['', undefined, null].includes(propsNode as any)) return propsNode;
  // 兜底输出插槽内容
  return slotNode?.(options?.params) || options?.defaultNode;
}

export default useTNodeJSX;

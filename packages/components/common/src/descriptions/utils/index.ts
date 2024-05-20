import type { ComponentOptions, Slots, VNode } from '@td/adapter-vue';
import { h } from '@td/adapter-vue';
import { isFunction, isString } from 'lodash-es';

import type { TdDescriptionItemProps } from '@td/intel/descriptions/type';
import type { TdDescriptionItem } from '../interface';
import { ItemsType } from '../interface';

/**
 * ! 处理 node string / <div> / () => <div> / Component
 * [
 *  { key: 'string / <div> / () => <div> / Component'  }
 * ]
 * @param node
 * @param params
 * @returns
 */
export function renderCustomNode(node: string | ((...args: any[]) => any) | ComponentOptions, params = {}) {
  if (isString(node)) {
    return node;
  }
  if (isFunction(node)) {
    return node(h, params);
  }
  if (isFunction(node.render)) {
    return node.render(h, params);
  }

  return node;
}

/**
 * ! 处理 VNode 中的 slot prop，同时存在时，props 优先级更高
 * @param node VNode
 * @param name1 props 名称，slot 名称应与其一致
 * @param name2 slot 别名
 * @returns
 */
export function renderVNodeTNode(node: VNode, name1: string, name2?: string) {
  const prop = node.props?.[name1];
  if (prop) {
    return prop;
  }

  const children = node.children as Slots;
  const slot = children?.[name1] || children?.[name2];

  if (slot) {
    return slot?.();
  }

  return null;
}

/**
 * 判断 item 当前类型
 * @param itemsType
 * @param item
 * @returns
 */
export function itemTypeIsProps(itemsType: ItemsType, item: TdDescriptionItem): item is TdDescriptionItemProps {
  return itemsType === ItemsType.props;
}

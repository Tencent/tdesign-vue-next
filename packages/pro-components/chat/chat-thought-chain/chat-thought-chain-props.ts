/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdChatThoughtChainProps } from '../type';
import { PropType } from 'vue';

export default {
  /** 是否支持折叠每个思考节点的内容 */
  collapsible: {
    type: Boolean as PropType<TdChatThoughtChainProps['collapsible']>,
    default: true,
  },
  /** 思维链节点列表 */
  items: {
    type: Array as PropType<TdChatThoughtChainProps['items']>,
    default: (): TdChatThoughtChainProps['items'] => [],
  },
  /** 展开的节点。支持语法糖 v-model:expandedValue */
  expandedValue: {
    type: Array as PropType<TdChatThoughtChainProps['expandedValue']>,
    default: undefined as TdChatThoughtChainProps['expandedValue'],
  },
  modelValue: {
    type: Array as PropType<TdChatThoughtChainProps['expandedValue']>,
    default: undefined as TdChatThoughtChainProps['expandedValue'],
  },
  /** 展开的节点。非受控属性 */
  defaultExpandedValue: {
    type: Array as PropType<TdChatThoughtChainProps['defaultExpandedValue']>,
    default: (): TdChatThoughtChainProps['defaultExpandedValue'] => [],
  },
  /** 自定义节点内容 */
  content: {
    type: Function as PropType<TdChatThoughtChainProps['content']>,
  },
  /** 自定义节点图标 */
  icon: {
    type: Function as PropType<TdChatThoughtChainProps['icon']>,
  },
  /** 自定义节点标题 */
  title: {
    type: Function as PropType<TdChatThoughtChainProps['title']>,
  },
  /** 节点展开/收起时触发 */
  onExpandChange: {
    type: Function as PropType<TdChatThoughtChainProps['onExpandChange']>,
    default: () => {},
  },
};

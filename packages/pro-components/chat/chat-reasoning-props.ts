import { animation } from './../../../dist/types/packages/components/statistic/type.d';
/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdChatReasoningProps } from './type';
import { PropType } from 'vue';

export default {
  /** 透传给 CollapsePanel 组件的全部属性 */
  collapsePanelProps: {
    type: Object as PropType<TdChatReasoningProps['collapsePanelProps']>,
    default: () =>
      ({
        destroyOnCollapse: false,
      } as TdChatReasoningProps['collapsePanelProps']),
  },
  /** 当前折叠面板展开图标。优先级低于collapsePanelProps.expandIcon */
  expandIcon: {
    type: Function as PropType<TdChatReasoningProps['expandIcon']>,
  },
  /** 展开图标位置，可选项：left/right */
  expandIconPlacement: {
    type: String as PropType<TdChatReasoningProps['expandIconPlacement']>,
    default: 'right' as TdChatReasoningProps['expandIconPlacement'],
    validator(val: TdChatReasoningProps['expandIconPlacement']): boolean {
      if (!val) return true;
      return ['left', 'right'].includes(val);
    },
  },
  /** 折叠面板头内容。优先级低于collapsePanelProps.header */
  header: {
    type: Function as PropType<TdChatReasoningProps['header']>,
  },
  /** 折叠面板尾内容。优先级低于collapsePanelProps.headerRightContent */
  headerRightContent: {
    type: Function as PropType<TdChatReasoningProps['headerRightContent']>,
  },
  /** 展开图标点击事件 */
  onExpandChange: {
    type: Function as PropType<TdChatReasoningProps['onExpandChange']>,
    default: () => {},
  },
  collapsed: {
    type: Boolean as PropType<TdChatReasoningProps['collapsed']>,
    default: false,
  },
  modelValue: {
    type: Boolean as PropType<TdChatReasoningProps['collapsed']>,
    default: undefined as TdChatReasoningProps['collapsed'],
  },
  defaultCollapsed: {
    type: Boolean as PropType<TdChatReasoningProps['collapsed']>,
    default: false,
  },
  layout: {
    type: String as PropType<TdChatReasoningProps['layout']>,
    default: 'block',
  },
};

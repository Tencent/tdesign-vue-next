/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdChatProps } from '../type';
import { PropType } from 'vue';

export default {
  /** 自定义操作按钮的插槽
   * @deprecated
   */
  actions: {
    type: Function as PropType<TdChatProps['actions']>,
  },
  /** 自定义操作按钮的插槽（推荐使用） */
  actionbar: {
    type: Function as PropType<TdChatProps['actionbar']>,
  },
  /** 是否开启自动滚动 */
  autoScroll: {
    type: Boolean,
    default: true,
  },
  /** 默认滚动位置 */
  defaultScrollTo: {
    type: String as PropType<TdChatProps['defaultScrollTo']>,
    default: 'bottom' as TdChatProps['defaultScrollTo'],
    validator(val: TdChatProps['defaultScrollTo']): boolean {
      if (!val) return true;
      return ['top', 'bottom'].includes(val);
    },
  },

  /** 动画效果，支持「渐变加载动画」,「闪烁加载动画」, 「骨架屏」三种 */
  animation: {
    type: String as PropType<TdChatProps['animation']>,
    default: 'skeleton' as TdChatProps['animation'],
    validator(val: TdChatProps['animation']): boolean {
      if (!val) return true;
      return ['skeleton', 'moving', 'gradient'].includes(val);
    },
  },
  /** 自定义每个对话单元的头像插槽 */
  avatar: {
    type: Function as PropType<TdChatProps['avatar']>,
  },
  /** 是否显示清空历史 */
  clearHistory: {
    type: Boolean,
    default: true,
  },
  /** 自定义每个对话单独的聊天内容 */
  content: {
    type: Function as PropType<TdChatProps['content']>,
  },
  /** 对话列表的数据 */
  data: {
    type: Array as PropType<TdChatProps['data']>,
  },
  /** 自定义每个对话单元的时间 */
  datetime: {
    type: Function as PropType<TdChatProps['datetime']>,
  },
  /** 流式加载是否结束 */
  isStreamLoad: Boolean,
  /** 对话布局形式，支持两侧对齐与左对齐 */
  layout: {
    type: String as PropType<TdChatProps['layout']>,
    default: 'both' as TdChatProps['layout'],
    validator(val: TdChatProps['layout']): boolean {
      if (!val) return true;
      return ['both', 'single'].includes(val);
    },
  },
  /** 自定义每个对话单元的昵称 */
  name: {
    type: Function as PropType<TdChatProps['name']>,
  },
  /** 自定义每个对话单元的思考过程的插槽 */
  reasoning: {
    type: Function as PropType<TdChatProps['reasoning']>,
  },
  /** 是否表现为倒序 */
  reverse: {
    type: Boolean,
    default: true,
  },
  /** 新消息是否处于加载状态，加载状态默认显示骨架屏，接口请求返回数据时请将新消息加载状态置为false */
  textLoading: Boolean,
  /** 点击清空历史按钮回调 */
  onClear: Function as PropType<TdChatProps['onClear']>,
  /** 滚动事件的回调 */
  onScroll: Function as PropType<TdChatProps['onScroll']>,
};

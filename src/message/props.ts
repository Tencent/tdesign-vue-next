/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdMessageProps } from './type';
import { PropType } from 'vue';

export default {
  /** 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。也可以完全自定义按钮 */
  closeBtn: {
    type: [String, Boolean, Function] as PropType<TdMessageProps['closeBtn']>,
    default: undefined,
  },
  /** 用于自定义消息弹出内容 */
  content: {
    type: [String, Function] as PropType<TdMessageProps['content']>,
  },
  /** 消息内置计时器，计时到达时会触发 duration-end 事件。单位：毫秒。值为 0 则表示没有计时器。 */
  duration: {
    type: Number,
    default: 3000,
  },
  /** 消息提醒前面的图标，可以自定义 */
  icon: {
    type: [Boolean, Function] as PropType<TdMessageProps['icon']>,
    default: true,
  },
  /** 消息组件风格 */
  theme: {
    type: String as PropType<TdMessageProps['theme']>,
    default: 'info' as TdMessageProps['theme'],
    validator(val: TdMessageProps['theme']): boolean {
      return ['info', 'success', 'warning', 'error', 'question', 'loading'].includes(val);
    },
  },
  /** 当关闭按钮存在时，用户点击关闭按钮触发 */
  onCloseBtnClick: Function as PropType<TdMessageProps['onCloseBtnClick']>,
  /** 计时结束后触发 */
  onDurationEnd: Function as PropType<TdMessageProps['onDurationEnd']>,
};

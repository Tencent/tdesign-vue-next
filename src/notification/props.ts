/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdNotificationProps } from './type';
import { PropType } from 'vue';

export default {
  /** 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例 */
  closeBtn: {
    type: [String, Boolean, Function] as PropType<TdNotificationProps['closeBtn']>,
    default: undefined,
  },
  /** 自定义内容 */
  content: {
    type: [String, Function] as PropType<TdNotificationProps['content']>,
  },
  /** 自定义内容，同 content */
  default: {
    type: [String, Function] as PropType<TdNotificationProps['default']>,
  },
  /** 消息显示时长，单位：毫秒。值为 0 表示永久显示 */
  duration: {
    type: Number,
    default: 3000,
  },
  /** 用于自定义底部内容 */
  footer: {
    type: [String, Function] as PropType<TdNotificationProps['footer']>,
  },
  /** 用于自定义消息通知前面的图标，优先级大于 theme 设定的图标。值为 false 则不显示图标，值为 true 显示 theme 设定图标 */
  icon: {
    type: [Boolean, Function] as PropType<TdNotificationProps['icon']>,
    default: true,
  },
  /** 消息类型 */
  theme: {
    type: String as PropType<TdNotificationProps['theme']>,
    default: 'info' as TdNotificationProps['theme'],
    validator(val: TdNotificationProps['theme']): boolean {
      return ['info', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 标题 */
  title: {
    type: [String, Function] as PropType<TdNotificationProps['title']>,
  },
  /** 点击关闭按钮时触发 */
  onCloseBtnClick: Function as PropType<TdNotificationProps['onCloseBtnClick']>,
  /** 计时结束时触发 */
  onDurationEnd: Function as PropType<TdNotificationProps['onDurationEnd']>,
};

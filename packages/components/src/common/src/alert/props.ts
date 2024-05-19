/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdAlertProps } from './type';
import { PropType } from 'vue';

export default {
  /** 关闭按钮。值为 true 则显示默认关闭按钮；值为 false 则不显示按钮；值类型为 string 则直接显示；值类型为 Function 则可以自定关闭按钮 */
  close: {
    type: [String, Boolean, Function] as PropType<TdAlertProps['close']>,
    default: false,
  },
  /** 内容，同 message */
  default: {
    type: [String, Function] as PropType<TdAlertProps['default']>,
  },
  /** 图标 */
  icon: {
    type: Function as PropType<TdAlertProps['icon']>,
  },
  /** 内容显示最大行数，超出的内容会折叠收起，用户点击后再展开。值为 0 表示不折叠 */
  maxLine: {
    type: Number,
    default: 0,
  },
  /** 内容（子元素） */
  message: {
    type: [String, Function] as PropType<TdAlertProps['message']>,
  },
  /** 跟在告警内容后面的操作区 */
  operation: {
    type: Function as PropType<TdAlertProps['operation']>,
  },
  /** 组件风格 */
  theme: {
    type: String as PropType<TdAlertProps['theme']>,
    default: 'info' as TdAlertProps['theme'],
    validator(val: TdAlertProps['theme']): boolean {
      return ['success', 'info', 'warning', 'error'].includes(val);
    },
  },
  /** 标题 */
  title: {
    type: [String, Function] as PropType<TdAlertProps['title']>,
  },
  /** 关闭按钮点击时触发 */
  onClose: Function as PropType<TdAlertProps['onClose']>,
  /** 告警提示框关闭动画结束后触发 */
  onClosed: Function as PropType<TdAlertProps['onClosed']>,
};

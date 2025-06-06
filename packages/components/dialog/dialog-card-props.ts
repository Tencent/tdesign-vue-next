/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDialogCardProps } from '../dialog/type';
import { PropType } from 'vue';

export default {
  /** 对话框内容 */
  body: {
    type: [String, Function] as PropType<TdDialogCardProps['body']>,
  },
  /** 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件 */
  cancelBtn: {
    type: [String, Object, Function] as PropType<TdDialogCardProps['cancelBtn']>,
  },
  /** 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例 */
  closeBtn: {
    type: [String, Boolean, Function] as PropType<TdDialogCardProps['closeBtn']>,
    default: true as TdDialogCardProps['closeBtn'],
  },
  /** 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件 */
  confirmBtn: {
    type: [String, Object, Function] as PropType<TdDialogCardProps['confirmBtn']>,
    default: true as TdDialogCardProps['confirmBtn'],
  },
  /** 确认按钮加载状态 */
  confirmLoading: Boolean,
  /** 底部操作栏，默认会有“确认”和“取消”两个按钮。值为 true 显示默认操作按钮，值为 false 不显示任何内容，值类型为 Function 表示自定义底部内容 */
  footer: {
    type: [Boolean, Function] as PropType<TdDialogCardProps['footer']>,
    default: true as TdDialogCardProps['footer'],
  },
  /** 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容，值类型为 string 则直接显示值，值类型为 Function 表示自定义头部内容 */
  header: {
    type: [String, Boolean, Function] as PropType<TdDialogCardProps['header']>,
    default: true as TdDialogCardProps['header'],
  },
  /** 对话框风格 */
  theme: {
    type: String as PropType<TdDialogCardProps['theme']>,
    default: 'default' as TdDialogCardProps['theme'],
    validator(val: TdDialogCardProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'info', 'warning', 'danger', 'success'].includes(val);
    },
  },
  /** 如果“取消”按钮存在，则点击“取消”按钮时触发，同时触发关闭事件 */
  onCancel: Function as PropType<TdDialogCardProps['onCancel']>,
  /** 点击右上角关闭按钮时触发 */
  onCloseBtnClick: Function as PropType<TdDialogCardProps['onCloseBtnClick']>,
  /** 如果“确认”按钮存在，则点击“确认”按钮时触发，或者键盘按下回车键时触发 */
  onConfirm: Function as PropType<TdDialogCardProps['onConfirm']>,
};

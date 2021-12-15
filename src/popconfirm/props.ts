/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdPopconfirmProps } from './type';
import { PropType } from 'vue';

export default {
  /** 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件 */
  cancelBtn: {
    type: [String, Object, Function] as PropType<TdPopconfirmProps['cancelBtn']>,
    default: '',
  },
  /** 确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件 */
  confirmBtn: {
    type: [String, Object, Function] as PropType<TdPopconfirmProps['confirmBtn']>,
    default: '',
  },
  /** 确认框内容 */
  content: {
    type: [String, Function] as PropType<TdPopconfirmProps['content']>,
  },
  /** 触发元素，同 triggerElement */
  default: {
    type: [String, Function] as PropType<TdPopconfirmProps['default']>,
  },
  /** 是否在关闭浮层时销毁浮层 */
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  /** 确认框图标 */
  icon: {
    type: Function as PropType<TdPopconfirmProps['icon']>,
  },
  /** 浮层出现位置 */
  placement: {
    type: String as PropType<TdPopconfirmProps['placement']>,
    default: 'top' as TdPopconfirmProps['placement'],
    validator(val: TdPopconfirmProps['placement']): boolean {
      return [
        'top',
        'left',
        'right',
        'bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'left-top',
        'left-bottom',
        'right-top',
        'right-bottom',
      ].includes(val);
    },
  },
  /** 透传 Popup 组件属性 */
  popupProps: {
    type: Object as PropType<TdPopconfirmProps['popupProps']>,
  },
  /** 是否显示浮层箭头 */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /** 文字提示风格 */
  theme: {
    type: String as PropType<TdPopconfirmProps['theme']>,
    default: 'default' as TdPopconfirmProps['theme'],
    validator(val: TdPopconfirmProps['theme']): boolean {
      return ['default', 'warning', 'danger'].includes(val);
    },
  },
  /** 触发元素 */
  triggerElement: {
    type: [String, Function] as PropType<TdPopconfirmProps['triggerElement']>,
  },
  /** 是否显示气泡确认框 */
  visible: Boolean,
  /** 是否显示气泡确认框，非受控属性 */
  defaultVisible: Boolean,
  /** 点击取消按钮时触发 */
  onCancel: Function as PropType<TdPopconfirmProps['onCancel']>,
  /** 点击确认按钮时触发 */
  onConfirm: Function as PropType<TdPopconfirmProps['onConfirm']>,
  /** 确认框显示或隐藏时触发 */
  onVisibleChange: Function as PropType<TdPopconfirmProps['onVisibleChange']>,
};

/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdPopupProps } from './type';
import { PropType } from 'vue';

export default {
  /** 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  attach: {
    type: [String, Function] as PropType<TdPopupProps['attach']>,
    default: 'body',
  },
  /** 浮层里面的内容 */
  content: {
    type: [String, Function] as PropType<TdPopupProps['content']>,
  },
  /** 触发元素，同 triggerElement */
  default: {
    type: [String, Function] as PropType<TdPopupProps['default']>,
  },
  /** 是否在关闭浮层时销毁浮层 */
  destroyOnClose: Boolean,
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 浮层类名，示例：'name1 name2 name3' 或 ['name1', 'name2'] 或 [{ 'name1': true }] */
  overlayClassName: {
    type: [String, Object, Array] as PropType<TdPopupProps['overlayClassName']>,
  },
  /** 浮层样式 */
  overlayStyle: {
    type: [Boolean, Object, Function] as PropType<TdPopupProps['overlayStyle']>,
  },
  /** 浮层出现位置 */
  placement: {
    type: String as PropType<TdPopupProps['placement']>,
    default: 'top' as TdPopupProps['placement'],
    validator(val: TdPopupProps['placement']): boolean {
      return ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top', 'left-bottom', 'right-top', 'right-bottom'].includes(val);
    },
  },
  /** 是否显示浮层箭头 */
  showArrow: Boolean,
  /** 触发浮层出现的方式 */
  trigger: {
    type: String as PropType<TdPopupProps['trigger']>,
    default: 'hover' as TdPopupProps['trigger'],
    validator(val: TdPopupProps['trigger']): boolean {
      return ['hover', 'click', 'focus', 'context-menu', 'manual'].includes(val);
    },
  },
  /** 触发元素 */
  triggerElement: {
    type: [String, Function] as PropType<TdPopupProps['triggerElement']>,
  },
  /** 是否显示浮层 */
  visible: Boolean,
  /** 是否显示浮层，非受控属性 */
  defaultVisible: Boolean,
  /** 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500 */
  zIndex: {
    type: Number,
  },
  /** 当浮层隐藏或显示时触发 */
  onVisibleChange: Function as PropType<TdPopupProps['onVisibleChange']>,
};

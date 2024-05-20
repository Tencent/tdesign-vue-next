

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdPopupProps } from './type';
import { PropType } from 'vue';

export default {
  /** 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  attach: {
    type: [String, Function] as PropType<TdPopupProps['attach']>,
    default: 'body' as TdPopupProps['attach'],
  },
  /** 浮层里面的内容 */
  content: {
    type: [String, Function] as PropType<TdPopupProps['content']>,
  },
  /** 触发元素，同 triggerElement */
  default: {
    type: [String, Function] as PropType<TdPopupProps['default']>,
  },
  /** 延时显示或隐藏浮层，[延迟显示的时间，延迟隐藏的时间]，单位：毫秒。如果只有一个时间，则表示显示和隐藏的延迟时间相同。示例 `'300'` 或者 `[200, 200]`。默认为：[250, 150] */
  delay: {
    type: [Number, Array] as PropType<TdPopupProps['delay']>,
  },
  /** 是否在关闭浮层时销毁浮层 */
  destroyOnClose: Boolean,
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 浮层是否隐藏空内容，默认不隐藏 */
  hideEmptyPopup: Boolean,
  /** 浮层类名，示例：'name1 name2 name3' 或 `['name1', 'name2']` 或 `[{ 'name1': true }]` */
  overlayClassName: {
    type: [String, Object, Array] as PropType<TdPopupProps['overlayClassName']>,
  },
  /** 浮层内容部分类名，示例：'name1 name2 name3' 或 `['name1', 'name2']` 或 `[{ 'name1': true }]` */
  overlayInnerClassName: {
    type: [String, Object, Array] as PropType<TdPopupProps['overlayInnerClassName']>,
  },
  /** 浮层内容部分样式，第一个参数 `triggerElement` 表示触发元素 DOM 节点，第二个参数 `popupElement` 表示浮层元素 DOM 节点 */
  overlayInnerStyle: {
    type: [Boolean, Object, Function] as PropType<TdPopupProps['overlayInnerStyle']>,
  },
  /** 浮层样式，第一个参数 `triggerElement` 表示触发元素 DOM 节点，第二个参数 `popupElement` 表示浮层元素 DOM 节点 */
  overlayStyle: {
    type: [Boolean, Object, Function] as PropType<TdPopupProps['overlayStyle']>,
  },
  /** 浮层出现位置 */
  placement: {
    type: String as PropType<TdPopupProps['placement']>,
    default: 'top',
  },
  /** popper 初始化配置，详情参考 https://popper.js.org/docs/ */
  popperOptions: {
    type: Object as PropType<TdPopupProps['popperOptions']>,
  },
  /** 是否显示浮层箭头 */
  showArrow: Boolean,
  /** 触发浮层出现的方式 */
  trigger: {
    type: String as PropType<TdPopupProps['trigger']>,
    default: 'hover' as TdPopupProps['trigger'],
    validator(val: TdPopupProps['trigger']): boolean {
      if (!val) return true;
      return ['hover', 'click', 'focus', 'mousedown', 'context-menu'].includes(val);
    },
  },
  /** 触发元素。值类型为字符串表示元素选择器 */
  triggerElement: {
    type: [String, Function] as PropType<TdPopupProps['triggerElement']>,
  },
  /** 是否显示浮层 */
  visible: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /** 是否显示浮层，非受控属性 */
  defaultVisible: Boolean,
  /** 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500 */
  zIndex: {
    type: Number,
  },
  /** 内容面板点击时触发 */
  onOverlayClick: Function as PropType<TdPopupProps['onOverlayClick']>,
  /** 下拉选项滚动事件 */
  onScroll: Function as PropType<TdPopupProps['onScroll']>,
  /** 下拉滚动触底事件，常用于滚动到底执行具体业务逻辑 */
  onScrollToBottom: Function as PropType<TdPopupProps['onScrollToBottom']>,
  /** 当浮层隐藏或显示时触发，`trigger=document` 表示点击非浮层元素触发；`trigger=context-menu` 表示右击触发 */
  onVisibleChange: Function as PropType<TdPopupProps['onVisibleChange']>,
};

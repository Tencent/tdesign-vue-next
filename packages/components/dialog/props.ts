/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { PropType } from 'vue';
import { TdDialogProps } from './type';

export default {
  /** 对话框挂载的节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  attach: {
    type: [String, Function] as PropType<TdDialogProps['attach']>,
  },
  /** 对话框内容 */
  body: {
    type: [String, Function] as PropType<TdDialogProps['body']>,
  },
  /** 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件 */
  cancelBtn: {
    type: [String, Object, Function, null] as PropType<TdDialogProps['cancelBtn']>,
  },
  /** 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例 */
  closeBtn: {
    type: [String, Boolean, Function] as PropType<TdDialogProps['closeBtn']>,
    default: true as TdDialogProps['closeBtn'],
  },
  /** 按下 ESC 时是否触发对话框关闭事件 */
  closeOnEscKeydown: {
    type: Boolean,
    default: undefined,
  },
  /** 点击蒙层时是否触发关闭事件 */
  closeOnOverlayClick: {
    type: Boolean,
    default: undefined,
  },
  /** 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件 */
  confirmBtn: {
    type: [String, Object, Function, null] as PropType<TdDialogProps['confirmBtn']>,
  },
  /** 确认按钮加载状态 */
  confirmLoading: {
    type: Boolean,
    default: undefined,
  },
  /** 是否在按下回车键时，触发确认事件 */
  confirmOnEnter: Boolean,
  /** 对话框内容，同 body */
  default: {
    type: [String, Function] as PropType<TdDialogProps['default']>,
  },
  /** 是否在关闭弹框的时候销毁子元素 */
  destroyOnClose: Boolean,
  /** 弹框元素类名，示例：'t-class-dialog-first t-class-dialog-second' */
  dialogClassName: {
    type: String,
    default: '',
  },
  /** 作用于对话框本身的样式 */
  dialogStyle: {
    type: Object as PropType<TdDialogProps['dialogStyle']>,
  },
  /** 对话框是否可以拖拽（仅在非模态对话框时有效） */
  draggable: Boolean,
  /** 底部操作栏，默认会有“确认”和“取消”两个按钮。值为 true 显示默认操作按钮，值为 false 不显示任何内容，值类型为 Function 表示自定义底部内容 */
  footer: {
    type: [Boolean, Function] as PropType<TdDialogProps['footer']>,
    default: true as TdDialogProps['footer'],
  },
  /** 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容，值类型为 string 则直接显示值，值类型为 Function 表示自定义头部内容 */
  header: {
    type: [String, Boolean, Function] as PropType<TdDialogProps['header']>,
    default: true as TdDialogProps['header'],
  },
  /** 是否启用对话框懒加载，启用时对话框内的内容不渲染 */
  lazy: Boolean,
  /** 对话框类型，有 4 种：模态对话框、非模态对话框、普通对话框、全屏对话框。弹出「模态对话框」时，只能操作对话框里面的内容，不能操作其他内容。弹出「非模态对话框」时，则可以操作页面内所有内容。「普通对话框」是指没有脱离文档流的对话框，可以在这个基础上开发更多的插件 */
  mode: {
    type: String as PropType<TdDialogProps['mode']>,
    default: 'modal' as TdDialogProps['mode'],
    validator(val: TdDialogProps['mode']): boolean {
      if (!val) return true;
      return ['modal', 'modeless', 'normal', 'full-screen'].includes(val);
    },
  },
  /** 对话框位置，内置两种：垂直水平居中显示 和 靠近顶部（top:20%）显示。默认情况，为避免贴顶或贴底，顶部和底部距离最小为 `48px`，可通过调整 `top` 覆盖默认大小 */
  placement: {
    type: String as PropType<TdDialogProps['placement']>,
    default: 'top' as TdDialogProps['placement'],
    validator(val: TdDialogProps['placement']): boolean {
      if (!val) return true;
      return ['top', 'center'].includes(val);
    },
  },
  /** 防止滚动穿透 */
  preventScrollThrough: {
    type: Boolean,
    default: true,
  },
  /** 仅在挂载元素中显示抽屉，默认在浏览器可视区域显示。父元素需要有定位属性，如：position: relative */
  showInAttachedElement: Boolean,
  /** 是否显示遮罩层 */
  showOverlay: {
    type: Boolean,
    default: true,
  },
  /** 对话框风格 */
  theme: {
    type: String as PropType<TdDialogProps['theme']>,
    default: 'default' as TdDialogProps['theme'],
    validator(val: TdDialogProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'info', 'warning', 'danger', 'success'].includes(val);
    },
  },
  /** 用于弹框具体窗口顶部的距离，优先级大于 placement */
  top: {
    type: [String, Number] as PropType<TdDialogProps['top']>,
  },
  /** 控制对话框是否显示 */
  visible: Boolean,
  /** 对话框宽度，示例：320, '500px', '80%' */
  width: {
    type: [String, Number] as PropType<TdDialogProps['width']>,
  },
  /** 对话框层级，Web 侧样式默认为 2500，移动端和小程序样式默认为 1500 */
  zIndex: {
    type: Number,
  },
  /** 对话框执行消失动画效果前触发 */
  onBeforeClose: Function as PropType<TdDialogProps['onBeforeClose']>,
  /** 对话框执行弹出动画效果前触发 */
  onBeforeOpen: Function as PropType<TdDialogProps['onBeforeOpen']>,
  /** 如果“取消”按钮存在，则点击“取消”按钮时触发，同时触发关闭事件 */
  onCancel: Function as PropType<TdDialogProps['onCancel']>,
  /** 关闭事件，点击取消按钮、点击关闭按钮、点击蒙层、按下 ESC 等场景下触发 */
  onClose: Function as PropType<TdDialogProps['onClose']>,
  /** 点击右上角关闭按钮时触发 */
  onCloseBtnClick: Function as PropType<TdDialogProps['onCloseBtnClick']>,
  /** 对话框消失动画效果结束后触发 */
  onClosed: Function as PropType<TdDialogProps['onClosed']>,
  /** 如果“确认”按钮存在，则点击“确认”按钮时触发，或者键盘按下回车键时触发 */
  onConfirm: Function as PropType<TdDialogProps['onConfirm']>,
  /** 按下 ESC 时触发事件 */
  onEscKeydown: Function as PropType<TdDialogProps['onEscKeydown']>,
  /** 对话框弹出动画效果结束后触发 */
  onOpened: Function as PropType<TdDialogProps['onOpened']>,
  /** 如果蒙层存在，点击蒙层时触发 */
  onOverlayClick: Function as PropType<TdDialogProps['onOverlayClick']>,
};

/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdDrawerProps } from './type';
import { PropType } from 'vue';

export default {
  /** 抽屉挂载的节点，默认挂在组件本身的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  attach: {
    type: [String, Function] as PropType<TdDrawerProps['attach']>,
    default: '',
  },
  /** 抽屉内容 */
  body: {
    type: [String, Function] as PropType<TdDrawerProps['body']>,
  },
  /** 取消按钮，可自定义。值为 undefined 或 null 则不显示取消按钮。值类型为 Object 则表示透传 Button 组件属性 */
  cancelBtn: {
    type: [String, Object, Function] as PropType<TdDrawerProps['cancelBtn']>,
    default: '',
  },
  /** 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例 */
  closeBtn: {
    type: [String, Boolean, Function] as PropType<TdDrawerProps['closeBtn']>,
    default: undefined,
  },
  /** 按下 ESC 时是否触发抽屉关闭事件 */
  closeOnEscKeydown: {
    type: Boolean,
    default: true,
  },
  /** 点击蒙层时是否触发抽屉关闭事件 */
  closeOnOverlayClick: {
    type: Boolean,
    default: true,
  },
  /** 确认按钮，可自定义。值为 undefined 或 null 则不显示确认按钮 */
  confirmBtn: {
    type: [String, Object, Function] as PropType<TdDrawerProps['confirmBtn']>,
    default: '',
  },
  /** 抽屉内容，同 body */
  default: {
    type: [String, Function] as PropType<TdDrawerProps['default']>,
  },
  /** 抽屉关闭时是否销毁节点 */
  destroyOnClose: Boolean,
  /** 底部操作栏，默认会有“确认”和“取消”两个按钮。值为 true 显示默认操作按钮，值为 false 不显示任何内容，值类型为 TNode 表示自定义底部内容 */
  footer: {
    type: [Boolean, Function] as PropType<TdDrawerProps['footer']>,
    default: true,
  },
  /** 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容，值类型为 string 则直接显示值，值类型为 TNode 表示自定义头部内容 */
  header: {
    type: [String, Boolean, Function] as PropType<TdDrawerProps['header']>,
    default: undefined,
  },
  /** 展开方式，有两种：直接展示在内容上方 和 推开内容区域 */
  mode: {
    type: String as PropType<TdDrawerProps['mode']>,
    default: 'overlay' as TdDrawerProps['mode'],
    validator(val: TdDrawerProps['mode']): boolean {
      return ['overlay', 'push'].includes(val);
    },
  },
  /** 抽屉方向 */
  placement: {
    type: String as PropType<TdDrawerProps['placement']>,
    default: 'right' as TdDrawerProps['placement'],
    validator(val: TdDrawerProps['placement']): boolean {
      return ['left', 'right', 'top', 'bottom'].includes(val);
    },
  },
  /** 仅在挂载元素中显示抽屉，默认在浏览器可视区域显示。父元素需要有定位属性，如：position: relative */
  showInAttachedElement: Boolean,
  /** 是否显示遮罩层 */
  showOverlay: {
    type: Boolean,
    default: true,
  },
  /** 尺寸，支持 'small', 'medium', 'large'，'35px', '30%',  '3em' 等。纵向抽屉调整的是抽屉宽度，横向抽屉调整的是抽屉高度 */
  size: {
    type: String,
    default: 'small',
  },
  /** 组件是否可见 */
  visible: Boolean,
  /** 组件是否可见，非受控属性 */
  defaultVisible: Boolean,
  /** 抽屉层级，样式默认为 1500 */
  zIndex: {
    type: Number,
  },
  /** 如果“取消”按钮存在，点击“取消”按钮时触发，同时触发关闭事件 */
  onCancel: Function as PropType<TdDrawerProps['onCancel']>,
  /** 关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发 */
  onClose: Function as PropType<TdDrawerProps['onClose']>,
  /** 如果关闭按钮存在，点击关闭按钮时触发该事件，同时触发关闭事件 */
  onCloseBtnClick: Function as PropType<TdDrawerProps['onCloseBtnClick']>,
  /** 如果“确认”按钮存在，则点击“确认”按钮时触发 */
  onConfirm: Function as PropType<TdDrawerProps['onConfirm']>,
  /** 按下 ESC 键时触发 */
  onEscKeydown: Function as PropType<TdDrawerProps['onEscKeydown']>,
  /** 如果蒙层存在，点击蒙层时触发 */
  onOverlayClick: Function as PropType<TdDrawerProps['onOverlayClick']>,
};

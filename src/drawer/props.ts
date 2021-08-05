/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-04-15 20:11:58
 * */

import { TdDrawerProps } from './TdDrawerProps';
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
  /** 对话框“取消”按钮，可自定义。值为 '' 或 null 则不显示取消按钮 */
  cancelBtn: {
    type: [String, Object, Function] as PropType<TdDrawerProps['cancelBtn']>,
    default: '取消',
  },
  /** 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例 */
  closeBtn: {
    type: [String, Boolean, Function] as PropType<TdDrawerProps['closeBtn']>,
    default: undefined,
  },
  /** 点击蒙层时是否触发抽屉关闭事件 */
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  /** 按下 ESC 时是否触发抽屉关闭事件 */
  closeOnKeydownEsc: {
    type: Boolean,
    default: true,
  },
  /** 对话框“确认”按钮，可自定义。值为 '' 或 null 则不显示确认按钮 */
  confirmBtn: {
    type: [String, Object, Function] as PropType<TdDrawerProps['confirmBtn']>,
    default: '确认',
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
    default: 'overlay',
    validator(val: string): boolean {
      return ['overlay', 'push'].includes(val);
    },
  },
  /** 抽屉方向 */
  placement: {
    type: String as PropType<TdDrawerProps['placement']>,
    default: 'right',
    validator(val: string): boolean {
      return ['left', 'right', 'top', 'bottom'].includes(val);
    },
  },
  /** 仅在挂载元素中显示抽屉，默认在浏览器可视区域显示 */
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
  /** 抽屉层级 */
  zIndex: {
    type: Number,
    default: 1500,
  },
  /** 如果“取消”按钮存在，点击“取消”按钮时触发，同时触发关闭事件 */
  onClickCancel: Function as PropType<TdDrawerProps['onClickCancel']>,
  /** 如果关闭按钮存在，点击关闭按钮时触发该事件，同时触发关闭事件 */
  onClickCloseBtn: Function as PropType<TdDrawerProps['onClickCloseBtn']>,
  /** 如果“确认”按钮存在，则点击“确认”按钮时触发 */
  onClickConfirm: Function as PropType<TdDrawerProps['onClickConfirm']>,
  /** 如果蒙层存在，点击蒙层时触发 */
  onClickOverlay: Function as PropType<TdDrawerProps['onClickOverlay']>,
  /** 关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发 */
  onClose: Function as PropType<TdDrawerProps['onClose']>,
  /** 按下 ESC 键时触发 */
  onKeydownEsc: Function as PropType<TdDrawerProps['onKeydownEsc']>,
};

/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdLoadingProps } from './type';
import { PropType } from 'vue';

export default {
  /** 挂载元素，默认挂载到组件本身所在的位置。仅全屏加载模式下有效。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  attach: {
    type: [String, Function] as PropType<TdLoadingProps['attach']>,
    default: '',
  },
  /** 子元素 */
  content: {
    type: [String, Function] as PropType<TdLoadingProps['content']>,
  },
  /** 子元素，同 content */
  default: {
    type: [String, Function] as PropType<TdLoadingProps['default']>,
  },
  /** 延迟显示加载效果的时间，用于防止请求速度过快引起的加载闪烁，单位：毫秒 */
  delay: {
    type: Number,
    default: 0,
  },
  /** 是否显示为全屏加载 */
  fullscreen: Boolean,
  /** 加载指示符，值为 true 显示默认指示符，值为 false 则不显示，也可以自定义指示符 */
  indicator: {
    type: [Boolean, Function] as PropType<TdLoadingProps['indicator']>,
    default: true,
  },
  /** 是否继承父元素颜色 */
  inheritColor: Boolean,
  /** 是否处于加载状态 */
  loading: {
    type: Boolean,
    default: true,
  },
  /** 防止滚动穿透，全屏加载模式有效 */
  preventScrollThrough: {
    type: Boolean,
    default: true,
  },
  /** 是否需要遮罩层，遮罩层对包裹元素才有效 */
  showOverlay: Boolean,
  /** 尺寸，示例：small/medium/large/12px/56px/0.3em */
  size: {
    type: String,
    default: 'medium',
  },
  /** 加载提示文案 */
  text: {
    type: [String, Function] as PropType<TdLoadingProps['text']>,
  },
  /** 消息通知层级，样式默认为 3500 */
  zIndex: {
    type: Number,
  },
};

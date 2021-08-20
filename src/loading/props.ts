/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdLoadingProps } from './type';
import { PropType } from 'vue';

export default {
  /** 挂载元素，默认挂载到组件本身所在的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
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
  /** 是否全屏遮罩，遮罩会挂载到 body */
  fullscreen: Boolean,
  /** 加载指示符，值为 true 显示默认指示符，值为 false 则不显示，也可以自定义指示符 */
  indicator: {
    type: [Boolean, Function] as PropType<TdLoadingProps['indicator']>,
    default: true,
  },
  /** 是否处于加载状态 */
  loading: {
    type: Boolean,
    default: true,
  },
  /** 防止滚动穿透 */
  preventScrollThrough: {
    type: Boolean,
    default: true,
  },
  /** 是否需要遮罩层，遮罩层对包裹元素才有效 */
  showOverlay: Boolean,
  /** 尺寸 */
  size: {
    type: String as PropType<TdLoadingProps['size']>,
    default: 'medium' as TdLoadingProps['size'],
    validator(val: TdLoadingProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
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

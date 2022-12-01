/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdImageProps } from './type';
import { PropType } from 'vue';

export default {
  /** 图片描述 */
  alt: {
    type: String,
    default: '',
  },
  /** 禁用状态，图片不响应鼠标事件 */
  disabled: Boolean,
  /** 自定义图片加载失败状态下的显示内容 */
  error: {
    type: Object as PropType<TdImageProps['error']>,
  },
  /** 图片填充模式 */
  fit: {
    type: String as PropType<TdImageProps['fit']>,
    default: 'fill' as TdImageProps['fit'],
    validator(val: TdImageProps['fit']): boolean {
      if (!val) return true;
      return ['contain', 'cover', 'fill', 'none', 'scale-down'].includes(val);
    },
  },
  /** 是否展示为图集样式 */
  gallery: Boolean,
  /** 是否开启图片懒加载 */
  lazy: Boolean,
  /** 自定义加载中状态的图片内容，如：“加载中” */
  loading: {
    type: Object as PropType<TdImageProps['loading']>,
  },
  /** 图片上方的浮层内容 */
  overlayContent: {
    type: Object as PropType<TdImageProps['overlayContent']>,
  },
  /** 浮层 `overlayContent` 出现的时机 */
  overlayTrigger: {
    type: String as PropType<TdImageProps['overlayTrigger']>,
    default: 'always' as TdImageProps['overlayTrigger'],
    validator(val: TdImageProps['overlayTrigger']): boolean {
      if (!val) return true;
      return ['always', 'hover'].includes(val);
    },
  },
  /** 占位元素，展示层级低于 `loading` `error` 和图片本身，值类型为字符串时表示占位图片地址 */
  placeholder: {
    type: [String, Object] as PropType<TdImageProps['placeholder']>,
  },
  /** 等同于原生的 object-position 属性，可选值为 top right bottom left 或 string，可以自定义任何单位，px 或者 百分比 */
  position: {
    type: String,
    default: 'center',
  },
  /** 图片圆角类型 */
  shape: {
    type: String as PropType<TdImageProps['shape']>,
    default: 'square' as TdImageProps['shape'],
    validator(val: TdImageProps['shape']): boolean {
      if (!val) return true;
      return ['circle', 'round', 'square'].includes(val);
    },
  },
  /** 图片链接 */
  src: {
    type: String,
    default: '',
  },
  /** 图片加载失败时触发 */
  onError: Function as PropType<TdImageProps['onError']>,
  /** 图片加载完成时触发 */
  onLoad: Function as PropType<TdImageProps['onLoad']>,
};

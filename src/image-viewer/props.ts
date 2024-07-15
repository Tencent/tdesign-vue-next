/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { PropType } from 'vue';
import { TdImageViewerProps } from './type';

export default {
  /** 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  attach: {
    type: [String, Function] as PropType<TdImageViewerProps['attach']>,
    default: 'body' as TdImageViewerProps['attach'],
  },
  /** 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；也可以完全自定义关闭按钮 */
  closeBtn: {
    type: [Boolean, Function] as PropType<TdImageViewerProps['closeBtn']>,
    default: true as TdImageViewerProps['closeBtn'],
  },
  /** 按下 ESC 时是否触发图片预览器关闭事件 */
  closeOnEscKeydown: {
    type: Boolean,
    default: true,
  },
  /** 是否在点击遮罩层时，触发预览关闭 */
  closeOnOverlay: Boolean,
  /** 是否允许拖拽调整位置。`mode=modal` 时，默认不允许拖拽；`mode=modeless` 时，默认允许拖拽 */
  draggable: {
    type: Boolean,
    default: undefined,
  },
  /** 图片预览中的 `<img>` 标签的原生属性，[MDN 定义](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) */
  imageReferrerpolicy: {
    type: String as PropType<TdImageViewerProps['imageReferrerpolicy']>,
    validator(val: TdImageViewerProps['imageReferrerpolicy']): boolean {
      if (!val) return true;
      return [
        'no-referrer',
        'no-referrer-when-downgrade',
        'origin',
        'origin-when-cross-origin',
        'same-origin',
        'strict-origin',
        'strict-origin-when-cross-origin',
        'unsafe-url',
      ].includes(val);
    },
  },
  /**  图片缩放相关配置。`imageScale.max` 缩放的最大比例；`imageScale.min` 缩放的最小比例；`imageScale.step` 缩放的步长速度; `imageScale.defaultScale` 默认的缩放比例 */
  imageScale: {
    type: Object as PropType<TdImageViewerProps['imageScale']>,
  },
  /** 图片数组。`mainImage` 表示主图，必传；`thumbnail` 表示缩略图，如果不存在，则使用主图显示；`download` 是否允许下载图片，默认允许下载。示例: `['img_url_1', 'img_url_2']`，`[{ thumbnail: 'small_image_url', mainImage: 'big_image_url', download: false }]` */
  images: {
    type: Array as PropType<TdImageViewerProps['images']>,
    default: (): TdImageViewerProps['images'] => [],
  },
  /** 当前预览图片所在的下标 */
  index: {
    type: Number,
    default: undefined,
  },
  /** 当前预览图片所在的下标，非受控属性 */
  defaultIndex: {
    type: Number,
    default: 0,
  },
  /** 模态预览（modal）和非模态预览（modeless) */
  mode: {
    type: String as PropType<TdImageViewerProps['mode']>,
    default: 'modal' as TdImageViewerProps['mode'],
    validator(val: TdImageViewerProps['mode']): boolean {
      if (!val) return true;
      return ['modal', 'modeless'].includes(val);
    },
  },
  /** 切换预览图片的左图标，可自定义 */
  navigationArrow: {
    type: [Boolean, Function] as PropType<TdImageViewerProps['navigationArrow']>,
    default: true as TdImageViewerProps['navigationArrow'],
  },
  /** 是否显示遮罩层。`mode=modal` 时，默认显示；`mode=modeless` 时，默认不显示 */
  showOverlay: {
    type: Boolean,
    default: undefined,
  },
  /** 预览标题 */
  title: {
    type: [String, Function] as PropType<TdImageViewerProps['title']>,
  },
  /** 触发图片预览的元素，可能是一个预览按钮，可能是一张缩略图，完全自定义 */
  trigger: {
    type: [String, Function] as PropType<TdImageViewerProps['trigger']>,
  },
  /** 限制预览器缩放的最小宽度和最小高度，仅 `mode=modeless` 时有效 */
  viewerScale: {
    type: Object as PropType<TdImageViewerProps['viewerScale']>,
  },
  /** 隐藏/显示预览 */
  visible: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /** 隐藏/显示预览，非受控属性 */
  defaultVisible: Boolean,
  /** 层级，默认为 2000 */
  zIndex: {
    type: Number,
  },
  /** 关闭时触发，事件参数包含触发关闭的来源：关闭按钮、遮罩层、ESC 键 */
  onClose: Function as PropType<TdImageViewerProps['onClose']>,
  /** 预览图片切换时触发，`context.prev` 切换到上一张图片，`context.next` 切换到下一张图片 */
  onIndexChange: Function as PropType<TdImageViewerProps['onIndexChange']>,
};

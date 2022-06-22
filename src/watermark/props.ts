/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdWatermarkProps } from './type';
import { PropType } from 'vue';

export default {
  /** 水印整体透明度，取值范围 [0-1] */
  alpha: {
    type: Number,
    default: 1,
  },
  /** 水印所覆盖的内容节点 */
  content: {
    type: [String, Function] as PropType<TdWatermarkProps['content']>,
  },
  /** 水印所覆盖的内容节点，同 `content` */
  default: {
    type: [String, Function] as PropType<TdWatermarkProps['default']>,
  },
  /** 水印高度 */
  height: {
    type: Number,
  },
  /** 水印是否重复出现 */
  isRepeat: {
    type: Boolean,
    default: true,
  },
  /** 行间距，只作用在多行（`content` 配置为数组）情况下 */
  lineSpace: {
    type: Number,
    default: 16,
  },
  /** 水印是否可移动 */
  movable: Boolean,
  /** 水印发生运动位移的间隙，单位：毫秒 */
  moveInterval: {
    type: Number,
    default: 3000,
  },
  /** 水印在画布上绘制的水平和垂直偏移量，正常情况下水印绘制在中间位置，即 `offset = [gapX / 2, gapY / 2]` */
  offset: {
    type: Array as PropType<TdWatermarkProps['offset']>,
  },
  /** 水印是否可被删除，默认会开启水印节点防删 */
  removable: {
    type: Boolean,
    default: true,
  },
  /** 水印旋转的角度，单位 ° */
  rotate: {
    type: Number,
    default: -22,
  },
  /** 水印内容，需要显示多行情况下可配置为数组 */
  watermarkContent: {
    type: [Object, Array] as PropType<TdWatermarkProps['watermarkContent']>,
  },
  /** 水印宽度 */
  width: {
    type: Number,
  },
  /** 水印之间的水平间距 */
  x: {
    type: Number,
  },
  /** 水印之间的垂直间距 */
  y: {
    type: Number,
  },
  /** 水印元素的 `z-index`，默认值写在 CSS 中 */
  zIndex: {
    type: Number,
  },
};

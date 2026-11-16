/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSplitProps } from './type';
import { PropType } from 'vue';

export default {
  /** 分割方向。horizontal：左右排列；vertical：上下排列 */
  direction: {
    type: String as PropType<TdSplitProps['direction']>,
    default: 'horizontal' as TdSplitProps['direction'],
    validator(val: TdSplitProps['direction']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 拖拽图标 */
  draggerIcon: {
    type: [String, Function] as PropType<TdSplitProps['draggerIcon']>,
  },
  /** 面板之间的间距（px），会体现在分割条视觉上 */
  gap: {
    type: Number,
    default: 0,
  },
  /** 延迟渲染模式 */
  lazy: Boolean,
  /** 定义每个面板的最大最小比例 */
  panelSize: {
    type: Object as PropType<TdSplitProps['panelSize']>,
  },
  /** 自定义分割条的样式类名 */
  splitClassName: {
    type: String,
    default: '',
  },
  /** 分割条的可交互区域宽度/高度（px） */
  splitSize: {
    type: Number,
    default: 6,
  },
  /** 自定义分割条的内联样式 */
  splitStyle: {
    type: Object as PropType<TdSplitProps['splitStyle']>,
  },
  /** 拖拽过程中尺寸变化的回调（像素值数组） */
  onResize: Function as PropType<TdSplitProps['onResize']>,
  /** 拖拽结束时的回调 */
  onResizeEnd: Function as PropType<TdSplitProps['onResizeEnd']>,
  /** 开始拖拽时的回调 */
  onResizeStart: Function as PropType<TdSplitProps['onResizeStart']>,
};

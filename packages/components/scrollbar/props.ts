/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import type { PropType } from 'vue';
import type { TdScrollbarProps } from './type';
export default {
  /** 视图层的 aria-label 文本 */
  ariaLabel: {
    type: String,
    default: '',
  },
  /** 滚动条 hover 时是否向外扩展（增加交互热区） */
  autoExpand: {
    type: Boolean,
    default: true,
  },
  /** 容器尺寸是否响应变化 */
  autoresize: {
    type: Boolean,
    default: true,
  },
  /** 设置滚动容器的最大高度/宽度 */
  container: {
    type: Object as PropType<TdScrollbarProps['container']>,
  },
  /** 禁止滚动 */
  disabled: Boolean,
  /** 视图层的 ID */
  id: {
    type: String,
    default: '',
  },
  /** 视图层的 WAI-ARIA 角色 */
  role: {
    type: String,
    default: 'scrollbar',
  },
  /** 滚动步长 */
  step: {
    type: Object as PropType<TdScrollbarProps['step']>,
  },
  /** 包裹容器的 tabindex */
  tabindex: {
    type: [String, Number] as PropType<TdScrollbarProps['tabindex']>,
  },
  /** 滚动条滑块的最小尺寸（px） */
  thumbMinSize: {
    type: Number,
    default: 20,
  },
  /** 视图（内容区）的自定义类名 */
  viewClassName: {
    type: String,
    default: '',
  },
  /** 滚动条的显示形式 */
  visibility: {
    type: String as PropType<TdScrollbarProps['visibility']>,
    default: 'hover' as TdScrollbarProps['visibility'],
    validator(val: TdScrollbarProps['visibility']): boolean {
      if (!val) return true;
      return ['always', 'hover', 'hide'].includes(val);
    },
  },
  /** 包裹容器的自定义类名 */
  wrapClassName: {
    type: String,
    default: '',
  },
  /** 滚动时触发 */
  onScroll: Function as PropType<TdScrollbarProps['onScroll']>,
};

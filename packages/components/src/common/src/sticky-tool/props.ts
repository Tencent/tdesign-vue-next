/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdStickyToolProps } from './type';
import { PropType } from 'vue';

export default {
  /** 列表 */
  list: {
    type: Array as PropType<TdStickyToolProps['list']>,
    default: (): TdStickyToolProps['list'] => [],
  },
  /** 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10em', '8rem'] */
  offset: {
    type: Array as PropType<TdStickyToolProps['offset']>,
  },
  /** 固定位置 */
  placement: {
    type: String as PropType<TdStickyToolProps['placement']>,
    default: 'right-bottom' as TdStickyToolProps['placement'],
    validator(val: TdStickyToolProps['placement']): boolean {
      if (!val) return true;
      return ['right-top', 'right-center', 'right-bottom', 'left-top', 'left-center', 'left-bottom'].includes(val);
    },
  },
  /** 透传 Popup 组件全部特性，优先级低于 StickyItem.popupProps */
  popupProps: {
    type: Object as PropType<TdStickyToolProps['popupProps']>,
  },
  /** 侧边栏菜单形状，有 2 种：方形、圆形 */
  shape: {
    type: String as PropType<TdStickyToolProps['shape']>,
    default: 'square' as TdStickyToolProps['shape'],
    validator(val: TdStickyToolProps['shape']): boolean {
      if (!val) return true;
      return ['square', 'round'].includes(val);
    },
  },
  /** 侧边栏菜单类型，有 2 种：常规型和紧凑型 */
  type: {
    type: String as PropType<TdStickyToolProps['type']>,
    default: 'normal' as TdStickyToolProps['type'],
    validator(val: TdStickyToolProps['type']): boolean {
      if (!val) return true;
      return ['normal', 'compact'].includes(val);
    },
  },
  /** 宽度 */
  width: {
    type: [String, Number] as PropType<TdStickyToolProps['width']>,
  },
  /** 点击某一项时触发 */
  onClick: Function as PropType<TdStickyToolProps['onClick']>,
  /** 悬浮到某一项时触发 */
  onHover: Function as PropType<TdStickyToolProps['onHover']>,
};

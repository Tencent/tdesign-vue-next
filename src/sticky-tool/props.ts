/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdStickyToolProps } from './type';
import { PropType } from 'vue';

export default {
  /** 默认是否折叠 */
  collapsed: Boolean,
  /** 是否可拖拽 */
  draggable: Boolean,
  /** 自定义折叠入口，collapsed 值为 true 有效 */
  entrance: {
    type: Function as PropType<TdStickyToolProps['entrance']>,
  },
  /** 列表 */
  list: {
    type: Array as PropType<TdStickyToolProps['list']>,
    default: (): TdStickyToolProps['list'] => [],
  },
  /** 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10em', '8rem'] */
  offset: {
    type: Object as PropType<TdStickyToolProps['offset']>,
  },
  /** 固定位置 */
  placement: {
    type: String as PropType<TdStickyToolProps['placement']>,
    default: 'right-bottom' as TdStickyToolProps['placement'],
    validator(val: TdStickyToolProps['placement']): boolean {
      return ['right-top', 'right-center', 'right-bottom', 'left-top', 'left-center', 'left-bottom'].includes(val);
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

/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdAnchorProps } from './type';
import { PropType } from 'vue';

export default {
  /** 透传 Affix 组件属性，即让 Anchor 组件支持所有 Affix 组件特性 */
  affixProps: {
    type: Object as PropType<TdAnchorProps['affixProps']>,
  },
  /** 锚点区域边界 */
  bounds: {
    type: Number,
    default: 5,
  },
  /** 指定滚动的容器。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  container: {
    type: [String, Function] as PropType<TdAnchorProps['container']>,
    default: () => (() => window),
  },
  /** 组件尺寸，small(120px)，medium(200px)，large(320px) */
  size: {
    type: String as PropType<TdAnchorProps['size']>,
    default: 'medium' as TdAnchorProps['size'],
    validator(val: TdAnchorProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 锚点滚动偏移量 */
  targetOffset: {
    type: Number,
    default: 0,
  },
  /** 锚点改变时触发 */
  onChange: Function as PropType<TdAnchorProps['onChange']>,
  /** 锚点被点击时触发 */
  onClick: Function as PropType<TdAnchorProps['onClick']>,
};

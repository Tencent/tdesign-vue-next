/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdAffixProps } from './type';
import { PropType } from 'vue';

export default {
  /** 指定滚动的容器。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  container: {
    type: [String, Function] as PropType<TdAffixProps['container']>,
    default: () => (() => window),
  },
  /**  距离容器顶部达到指定距离后触发固定 */
  offsetBottom: {
    type: Number,
    default: 0,
  },
  /**  距离容器底部达到指定距离后触发固定 */
  offsetTop: {
    type: Number,
    default: 0,
  },
  /** 固钉定位层级，样式默认为 500 */
  zIndex: {
    type: Number,
  },
  /** 固定状态发生变化时触发 */
  onFixedChange: Function as PropType<TdAffixProps['onFixedChange']>,
};

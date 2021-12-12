/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdCardProps } from './type';
import { PropType } from 'vue';

export default {
  /** 卡片标题的操作区 */
  actions: {
    type: [String, Function] as PropType<TdCardProps['actions']>,
  },
  /** 是否有边框 */
  bordered: {
    type: Boolean,
    default: true,
  },
  /** 卡片封面图。值类型为字符串，会自动使用 `img` 标签输出封面图；也可以完全最定义封面图 */
  cover: {
    type: [String, Function] as PropType<TdCardProps['cover']>,
  },
  /** 卡片底部内容，可完全自定义 */
  footer: {
    type: [String, Function] as PropType<TdCardProps['footer']>,
  },
  /** 加载状态，值为 true 会根据不同的布局显示不同的加载状态，值为 false 则表示非加载状态。也可以使用 Sketon 组件完全自定义加载态呈现内容 */
  loading: {
    type: [Boolean, Function] as PropType<TdCardProps['loading']>,
    default: false,
  },
  /** 是否显示卡片阴影，默认不显示 */
  shadow: Boolean,
  /** 尺寸 */
  size: {
    type: String as PropType<TdCardProps['size']>,
    default: 'medium' as TdCardProps['size'],
    validator(val: TdCardProps['size']): boolean {
      return ['medium', 'small'].includes(val);
    },
  },
  /** 卡片标题 */
  title: {
    type: [String, Function] as PropType<TdCardProps['title']>,
  },
};

/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdListProps } from './type';
import { PropType } from 'vue';

export default {
  /** 自定义加载中。值为空不显示加载中，值为 'loading' 显示加载中状态，值为 'load-more' 显示加载更多状态。值类型为函数，则表示自定义加载状态呈现内容 */
  asyncLoading: {
    type: [String, Function] as PropType<TdListProps['asyncLoading']>,
  },
  /** 底部 */
  footer: {
    type: [String, Function] as PropType<TdListProps['footer']>,
  },
  /** 头部 */
  header: {
    type: [String, Function] as PropType<TdListProps['header']>,
  },
  /** 排列方式（待设计稿输出） */
  layout: {
    type: String as PropType<TdListProps['layout']>,
    default: 'horizontal' as TdListProps['layout'],
    validator(val: TdListProps['layout']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`scroll.threshold` 默认为 `100` */
  scroll: {
    type: Object as PropType<TdListProps['scroll']>,
  },
  /** 尺寸 */
  size: {
    type: String as PropType<TdListProps['size']>,
    default: 'medium' as TdListProps['size'],
    validator(val: TdListProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 是否展示分割线 */
  split: Boolean,
  /** 是否展示斑马纹 */
  stripe: Boolean,
  /** 点击加载更多时触发 */
  onLoadMore: Function as PropType<TdListProps['onLoadMore']>,
  /** 列表滚动时触发，scrollTop 表示顶部滚动距离，scrollBottom 表示底部滚动距离 */
  onScroll: Function as PropType<TdListProps['onScroll']>,
};

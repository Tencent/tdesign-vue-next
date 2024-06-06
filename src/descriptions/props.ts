/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDescriptionsProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否带边框 */
  bordered: Boolean,
  /** 字段名右侧是否携带冒号“：” */
  colon: Boolean,
  /** 一行 `DescriptionItem` 的数量 */
  column: {
    type: Number,
    default: 2,
  },
  /** 自定义描述项内容的样式 */
  contentStyle: {
    type: Object as PropType<TdDescriptionsProps['contentStyle']>,
  },
  /** 描述项的排列方向 */
  itemLayout: {
    type: String as PropType<TdDescriptionsProps['itemLayout']>,
    default: 'horizontal' as TdDescriptionsProps['itemLayout'],
    validator(val: TdDescriptionsProps['itemLayout']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 描述项的列表 */
  items: {
    type: Array as PropType<TdDescriptionsProps['items']>,
  },
  /** 自定义描述项标签的样式 */
  labelStyle: {
    type: Object as PropType<TdDescriptionsProps['labelStyle']>,
  },
  /** 排列方向 */
  layout: {
    type: String as PropType<TdDescriptionsProps['layout']>,
    default: 'horizontal' as TdDescriptionsProps['layout'],
    validator(val: TdDescriptionsProps['layout']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdDescriptionsProps['size']>,
    default: 'medium' as TdDescriptionsProps['size'],
    validator(val: TdDescriptionsProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 用于设置底层 `table` 单元格、行和列的布局算法，与原生 table-layout css 属性完全一致。`fixed`：采用固定布局算法；`auto`：采用自动布局算法。详情可参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) */
  tableLayout: {
    type: String as PropType<TdDescriptionsProps['tableLayout']>,
    default: 'fixed' as TdDescriptionsProps['tableLayout'],
    validator(val: TdDescriptionsProps['tableLayout']): boolean {
      if (!val) return true;
      return ['fixed', 'auto'].includes(val);
    },
  },
  /** 描述列表的标题 */
  title: {
    type: [String, Function] as PropType<TdDescriptionsProps['title']>,
  },
};

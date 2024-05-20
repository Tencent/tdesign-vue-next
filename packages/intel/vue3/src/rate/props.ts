/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdRateProps } from './type';

;

export default {
  /** 是否允许半选 */
  allowHalf: Boolean,
  /** 评分图标的颜色，样式中默认为 #ED7B2F。一个值表示设置选中高亮的五角星颜色，示例：[选中颜色]。数组则表示分别设置 选中高亮的五角星颜色 和 未选中暗灰的五角星颜色，[选中颜色，未选中颜色]。示例：['#ED7B2F', '#E3E6EB'] */
  color: {
    type: [String, Array] as PropType<TdRateProps['color']>,
    default: '#ED7B2F' as TdRateProps['color'],
  },
  /** 评分的数量 */
  count: {
    type: Number,
    default: 5,
  },
  /** 是否禁用评分 */
  disabled: Boolean,
  /** 评分图标的间距 */
  gap: {
    type: Number,
    default: 4,
  },
  /** 自定义评分图标 */
  icon: {
    type: Function as PropType<TdRateProps['icon']>,
  },
  /** 是否显示对应的辅助文字 */
  showText: Boolean,
  /** 评分图标的大小，示例：`20px` */
  size: {
    type: String,
    default: '24px',
  },
  /** 评分等级对应的辅助文字。组件内置默认值为：['极差', '失望', '一般', '满意', '惊喜']。自定义值示例：['1分', '2分', '3分', '4分', '5分'] */
  texts: {
    type: Array as PropType<TdRateProps['texts']>,
    default: (): TdRateProps['texts'] => [],
  },
  /** 选择评分的值 */
  value: {
    type: Number,
    default: undefined,
  },
  modelValue: {
    type: Number,
    default: undefined,
  },
  /** 选择评分的值，非受控属性 */
  defaultValue: {
    type: Number,
    default: 0,
  },
  /** 评分数改变时触发 */
  onChange: Function as PropType<TdRateProps['onChange']>,
};

/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdCascaderProps } from './type';
import { PropType } from 'vue';

export default {
  /** 参考 checkbox 组件 API */
  checkProps: {
    type: Object as PropType<TdCascaderProps['checkProps']>,
  },
  /** 父子节点选中状态不再关联，可各自选中或取消 */
  checkStrictly: Boolean,
  /** 是否支持清空选项 */
  clearable: Boolean,
  /** 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义 */
  collapsedItems: {
    type: Function as PropType<TdCascaderProps['collapsedItems']>,
  },
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 无匹配选项时的内容，默认全局配置为 '暂无数据' */
  empty: {
    type: [String, Function] as PropType<TdCascaderProps['empty']>,
  },
  /** 是否可搜索 */
  filterable: Boolean,
  /** 用来定义 value / label / children 在 `options` 中对应的字段别名 */
  keys: {
    type: Object as PropType<TdCascaderProps['keys']>,
  },
  /** 延迟加载 children 为 true 的子节点，即使 expandAll 被设置为 true，也同样延迟加载 */
  lazy: {
    type: Boolean,
    default: true,
  },
  /** 加载子树数据的方法（仅当节点 children 为 true 时生效） */
  load: {
    type: Function as PropType<TdCascaderProps['load']>,
  },
  /** 是否为加载状态 */
  loading: Boolean,
  /** 远程加载时显示的文字，支持自定义。如加上超链接 */
  loadingText: {
    type: [String, Function] as PropType<TdCascaderProps['loadingText']>,
    default: '',
  },
  /** 用于控制多选数量，值为 0 则不限制 */
  max: {
    type: Number,
    default: 0,
  },
  /** 最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 */
  minCollapsedNum: {
    type: Number,
    default: 0,
  },
  /** 是否允许多选 */
  multiple: Boolean,
  /** 可选项数据源 */
  options: {
    type: Array as PropType<TdCascaderProps['options']>,
    default: (): TdCascaderProps['options'] => [],
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 参考 popup 组件 API */
  popupProps: {
    type: Object as PropType<TdCascaderProps['popupProps']>,
  },
  /** 输入框中是否显示选中值的完整路径 */
  showAllLevels: {
    type: Boolean,
    default: true,
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdCascaderProps['size']>,
    default: 'medium' as TdCascaderProps['size'],
    validator(val: TdCascaderProps['size']): boolean {
      return ['large', 'medium', 'small'].includes(val);
    },
  },
  /** 展开下一层级的方式 */
  trigger: {
    type: String as PropType<TdCascaderProps['trigger']>,
    default: 'click' as TdCascaderProps['trigger'],
    validator(val: TdCascaderProps['trigger']): boolean {
      return ['click', 'hover'].includes(val);
    },
  },
  /** 选中项的值 */
  value: {
    type: [String, Number, Array] as PropType<TdCascaderProps['value']>,
    default: (): TdCascaderProps['value'] => [],
  },
  /** 选中项的值，非受控属性 */
  defaultValue: {
    type: [String, Number, Array] as PropType<TdCascaderProps['defaultValue']>,
    default: (): TdCascaderProps['defaultValue'] => [],
  },
  /** 选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaft 表示无论什么情况，选中值仅呈现叶子节点 */
  valueMode: {
    type: String as PropType<TdCascaderProps['valueMode']>,
    default: 'onlyLeaf' as TdCascaderProps['valueMode'],
    validator(val: TdCascaderProps['valueMode']): boolean {
      return ['onlyLeaf', 'parentFirst', 'all'].includes(val);
    },
  },
  /** 当输入框失去焦点时触发 */
  onBlur: Function as PropType<TdCascaderProps['onBlur']>,
  /** 选中值发生变化时触发。TreeNodeModel 从树组件中导出。`context.node` 表示触发事件的节点，`context.source` 表示触发事件的来源 */
  onChange: Function as PropType<TdCascaderProps['onChange']>,
  /** 获得焦点时触发 */
  onFocus: Function as PropType<TdCascaderProps['onFocus']>,
  /** 多选模式下，选中数据被移除时触发 */
  onRemove: Function as PropType<TdCascaderProps['onRemove']>,
};

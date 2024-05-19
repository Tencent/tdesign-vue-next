/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { SizeEnum, TNode, TreeKeysType, TreeOptionData } from '@td/shared/interface';
import type { TdCheckboxProps } from '../checkbox/type';
import type { TdInputProps } from '../input/type';
import type { PopupVisibleChangeContext, TdPopupProps } from '../popup/type';
import type { SelectInputBlurContext, TdSelectInputProps } from '../select-input/type';
import type { TdTagInputProps } from '../tag-input/type';
import type { TdTagProps } from '../tag/type';
import type { TreeNodeModel } from '../tree/type';

export interface TdCascaderProps<CascaderOption extends TreeOptionData = TreeOptionData> {
  /**
   * 自动聚焦
   */
  autofocus?: boolean;
  /**
   * 无边框模式
   * @default false
   */
  borderless?: boolean;
  /**
   * 参考 checkbox 组件 API
   */
  checkProps?: TdCheckboxProps;
  /**
   * 父子节点选中状态不再关联，可各自选中或取消
   * @default false
   */
  checkStrictly?: boolean;
  /**
   * 是否支持清空选项
   * @default false
   */
  clearable?: boolean;
  /**
   * 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示当前存在的所有标签，`collapsedSelectedItems` 表示折叠的标签，`count` 表示折叠的数量，`onClose` 表示移除标签的事件回调
   */
  collapsedItems?: TNode<{
    value: CascaderOption[];
    collapsedSelectedItems: CascaderOption[];
    count: number;
    onClose: (context: { index: number; e?: MouseEvent }) => void;
  }>;
  /**
   * 是否禁用组件
   */
  disabled?: boolean;
  /**
   * 无匹配选项时的内容，默认全局配置为 '暂无数据'
   */
  empty?: string | TNode;
  /**
   * 自定义过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据
   */
  filter?: (filterWords: string, node: TreeNodeModel) => boolean | Promise<boolean>;
  /**
   * 是否可搜索
   * @default false
   */
  filterable?: boolean;
  /**
   * 透传 Input 输入框组件的全部属性
   */
  inputProps?: TdInputProps;
  /**
   * 用来定义 value / label / children / disabled 在 `options` 中对应的字段别名
   */
  keys?: TreeKeysType;
  /**
   * 左侧文本
   */
  label?: string | TNode;
  /**
   * 延迟加载 children 为 true 的子节点，即使 expandAll 被设置为 true，也同样延迟加载
   * @default true
   */
  lazy?: boolean;
  /**
   * 加载子树数据的方法（仅当节点 children 为 true 时生效）
   */
  load?: (node: TreeNodeModel<CascaderOption>) => Promise<Array<CascaderOption>>;
  /**
   * 是否为加载状态
   * @default false
   */
  loading?: boolean;
  /**
   * 远程加载时显示的文字，支持自定义。如加上超链接
   */
  loadingText?: string | TNode;
  /**
   * 用于控制多选数量，值为 0 则不限制
   * @default 0
   */
  max?: number;
  /**
   * 最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠
   * @default 0
   */
  minCollapsedNum?: number;
  /**
   * 是否允许多选
   * @default false
   */
  multiple?: boolean;
  /**
   * 自定义单个级联选项
   */
  option?: TNode<{ item: CascaderOption; index: number }>;
  /**
   * 可选项数据源
   * @default []
   */
  options?: Array<CascaderOption>;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 参考 popup 组件 API
   */
  popupProps?: TdPopupProps;
  /**
   * 是否显示下拉框
   */
  popupVisible?: boolean;
  /**
   * 组件前置图标
   */
  prefixIcon?: TNode;
  /**
   * 只读状态，值为真会隐藏输入框，且无法打开下拉框
   * @default false
   */
  readonly?: boolean;
  /**
   * 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词
   * @default false
   */
  reserveKeyword?: boolean;
  /**
   * 透传 SelectInput 筛选器输入框组件的全部属性
   */
  selectInputProps?: TdSelectInputProps;
  /**
   * 选中值使用完整路径，输入框在单选时也显示完整路径
   * @default true
   */
  showAllLevels?: boolean;
  /**
   * 组件尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 输入框状态
   * @default default
   */
  status?: 'default' | 'success' | 'warning' | 'error';
  /**
   * 后置图标前的后置内容
   */
  suffix?: string | TNode;
  /**
   * 组件后置图标
   */
  suffixIcon?: TNode;
  /**
   * 透传 TagInput 标签输入框组件的全部属性
   */
  tagInputProps?: TdTagInputProps;
  /**
   * 透传 Tag 标签组件全部属性
   */
  tagProps?: TdTagProps;
  /**
   * 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式
   */
  tips?: string | TNode;
  /**
   * 展开下一层级的方式
   * @default click
   */
  trigger?: 'click' | 'hover';
  /**
   * 选中项的值
   * @default []
   */
  value?: CascaderValue<CascaderOption>;
  /**
   * 选中项的值，非受控属性
   * @default []
   */
  defaultValue?: CascaderValue<CascaderOption>;
  /**
   * 选中项的值
   * @default []
   */
  modelValue?: CascaderValue<CascaderOption>;
  /**
   * 自定义选中项呈现的内容
   */
  valueDisplay?:
    | string
    | TNode<{
      value: CascaderValue<CascaderOption>;
      onClose: (index: number) => void;
      displayValue?: CascaderValue<CascaderOption>;
      selectedOptions: CascaderOption[];
    }>;
  /**
   * 选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaf 表示无论什么情况，选中值仅呈现叶子节点
   * @default onlyLeaf
   */
  valueMode?: 'onlyLeaf' | 'parentFirst' | 'all';
  /**
   * 用于控制选中值的类型。single 表示输入输出值为 叶子结点值， full 表示输入输出值为全路径
   * @default single
   */
  valueType?: 'single' | 'full';
  /**
   * 当输入框失去焦点时触发
   */
  onBlur?: (context: { value: CascaderValue<CascaderOption> } & SelectInputBlurContext) => void;
  /**
   * 选中值发生变化时触发。TreeNodeModel 从树组件中导出。`context.node` 表示触发事件的节点，`context.source` 表示触发事件的来源
   */
  onChange?: (value: CascaderValue<CascaderOption>, context: CascaderChangeContext<CascaderOption>) => void;
  /**
   * 获得焦点时触发
   */
  onFocus?: (context: { value: CascaderValue<CascaderOption>; e: FocusEvent }) => void;
  /**
   * 下拉框显示或隐藏时触发
   */
  onPopupVisibleChange?: (visible: boolean, context: PopupVisibleChangeContext) => void;
  /**
   * 多选模式下，选中数据被移除时触发
   */
  onRemove?: (context: RemoveContext<CascaderOption>) => void;
}

export type CascaderValue<T extends TreeOptionData = TreeOptionData> = string | number | T | Array<CascaderValue<T>>;

export interface CascaderChangeContext<CascaderOption> {
  node?: TreeNodeModel<CascaderOption>;
  source: CascaderChangeSource;
}

export type CascaderChangeSource = 'invalid-value' | 'check' | 'clear' | 'uncheck';

export interface RemoveContext<T> {
  value: CascaderValue<T>;
  node: TreeNodeModel<T>;
}

/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { InputProps } from '../input';
import { PopupProps } from '../popup';
import { TextareaProps } from '../textarea';
import { TNode, SizeEnum } from '../common';

export interface TdAutoCompleteProps<T extends AutoCompleteOption = AutoCompleteOption> {
  /**
   * 自动获取焦点
   */
  autofocus?: boolean;
  /**
   * 是否允许清空
   */
  clearable?: boolean;
  /**
   * 触发显示联想词下拉框的元素，同 `triggerElement`
   */
  default?: string | TNode;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 自定义过滤规则，用于对现有数据进行搜索过滤，判断是否过滤某一项数据。参数 `filterWords` 表示搜索词，`option`表示单个选项内容，返回值为 `true` 保留该选项，返回值为 `false` 则隐藏该选项。使用该方法时无需设置 `filterable`
   */
  filter?: (filterWords: string, option: T) => boolean | Promise<boolean>;
  /**
   * 是否根据输入内容过滤联想词。默认过滤规则不区分大小写，全文本任意位置匹配。如果默认搜索规则不符合业务需求，可以更为使用 `filter` 自定义过滤规则。部分场景下输入关键词和下拉联想词完全不同，此时可以设置为 `false`
   * @default true
   */
  filterable?: boolean;
  /**
   * 是否高亮联想词中和输入值的相同部分
   * @default true
   */
  highlightKeyword?: boolean;
  /**
   * 透传 Input 组件全部特性
   */
  inputProps?: InputProps;
  /**
   * 下拉联想词列表。示例一：`['联想词一', '联想词二']`。示例二：`{ label: () => <div>联想词元素</div>, text: '用于搜索的纯联想词' }`
   */
  options?: Array<T>;
  /**
   * 面板内的底部内容
   */
  panelBottomContent?: string | TNode;
  /**
   * 面板内的顶部内容
   */
  panelTopContent?: string | TNode;
  /**
   * 输入框为空时的占位提示。组件本身默认值为 `undefined`，但全局配置存在默认值，不同语言全局默认值不同
   */
  placeholder?: string;
  /**
   * 透传 Popup 组件全部特性
   */
  popupProps?: PopupProps;
  /**
   * 是否只读
   */
  readonly?: boolean;
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
   * 透传 Textarea 组件全部特性
   */
  textareaProps?: TextareaProps;
  /**
   * 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式
   */
  tips?: string | TNode;
  /**
   * 触发显示联想词下拉框的元素，默认为 Input 组件，可以使用 `trigger` 自定义为 Textarea 组件或其他组件
   */
  triggerElement?: string | TNode;
  /**
   * 输入框的值，即当前指定的联想词
   * @default ''
   */
  value?: string;
  /**
   * 输入框的值，即当前指定的联想词，非受控属性
   * @default ''
   */
  defaultValue?: string;
  /**
   * 输入框的值，即当前指定的联想词
   * @default ''
   */
  modelValue?: string;
  /**
   * 失去焦点时触发
   */
  onBlur?: (context: { e: FocusEvent; value: string }) => void;
  /**
   * 输入框值发生变化时触发
   */
  onChange?: (value: string, context?: { e?: InputEvent | MouseEvent | CompositionEvent | KeyboardEvent }) => void;
  /**
   * 清空按钮点击时触发
   */
  onClear?: (context: { e: MouseEvent }) => void;
  /**
   * 中文输入结束时触发
   */
  onCompositionend?: (context: { e: CompositionEvent; value: string }) => void;
  /**
   * 中文输入开始时触发
   */
  onCompositionstart?: (context: { e: CompositionEvent; value: string }) => void;
  /**
   * 回车键按下时触发
   */
  onEnter?: (context: { e: KeyboardEvent; value: string }) => void;
  /**
   * 获得焦点时触发
   */
  onFocus?: (context: { e: FocusEvent; value: string }) => void;
  /**
   * 选中联想词时触发
   */
  onSelect?: (value: string, context: { e: MouseEvent | KeyboardEvent }) => void;
}

export type AutoCompleteOption = string | AutoCompleteOptionObj;

export interface AutoCompleteOptionObj {
  label?: string | TNode;
  text?: string;
  [key: string]: any;
}

export interface HighlightOptionProps {
  content: string;
  keyword: string;
}

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdAutoCompleteProps } from './type';

export default {
  /** 自动获取焦点 */
  autofocus: Boolean,
  /** 是否允许清空 */
  clearable: Boolean,
  /** 触发显示联想词下拉框的元素，同 `triggerElement` */
  default: {
    type: [String, Function] as PropType<TdAutoCompleteProps['default']>,
  },
  /** 是否禁用 */
  disabled: Boolean,
  /** 自定义过滤规则，用于对现有数据进行搜索过滤，判断是否过滤某一项数据。参数 `filterWords` 表示搜索词，`option`表示单个选项内容，返回值为 `true` 保留该选项，返回值为 `false` 则隐藏该选项。使用该方法时无需设置 `filterable` */
  filter: {
    type: Function as PropType<TdAutoCompleteProps['filter']>,
  },
  /** 是否根据输入内容过滤联想词。默认过滤规则不区分大小写，全文本任意位置匹配。如果默认搜索规则不符合业务需求，可以更为使用 `filter` 自定义过滤规则。部分场景下输入关键词和下拉联想词完全不同，此时可以设置为 `false` */
  filterable: {
    type: Boolean,
    default: true,
  },
  /** 是否高亮联想词中和输入值的相同部分 */
  highlightKeyword: {
    type: Boolean,
    default: true,
  },
  /** 透传 Input 组件全部特性 */
  inputProps: {
    type: Object as PropType<TdAutoCompleteProps['inputProps']>,
  },
  /** 下拉联想词列表。示例一：`['联想词一', '联想词二']`。示例二：`{ label: () => <div>联想词元素</div>, text: '用于搜索的纯联想词' }` */
  options: {
    type: Array as PropType<TdAutoCompleteProps['options']>,
  },
  /** 面板内的底部内容 */
  panelBottomContent: {
    type: [String, Function] as PropType<TdAutoCompleteProps['panelBottomContent']>,
  },
  /** 面板内的顶部内容 */
  panelTopContent: {
    type: [String, Function] as PropType<TdAutoCompleteProps['panelTopContent']>,
  },
  /** 输入框为空时的占位提示。组件本身默认值为 `undefined`，但全局配置存在默认值，不同语言全局默认值不同 */
  placeholder: {
    type: String,
    default: undefined,
  },
  /** 透传 Popup 组件全部特性 */
  popupProps: {
    type: Object as PropType<TdAutoCompleteProps['popupProps']>,
  },
  /** 是否只读 */
  readonly: Boolean,
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdAutoCompleteProps['size']>,
    default: 'medium' as TdAutoCompleteProps['size'],
    validator(val: TdAutoCompleteProps['size']): boolean {
      if (!val) {
        return true;
      }
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<TdAutoCompleteProps['status']>,
    default: 'default' as TdAutoCompleteProps['status'],
    validator(val: TdAutoCompleteProps['status']): boolean {
      if (!val) {
        return true;
      }
      return ['default', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 透传 Textarea 组件全部特性 */
  textareaProps: {
    type: Object as PropType<TdAutoCompleteProps['textareaProps']>,
  },
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<TdAutoCompleteProps['tips']>,
  },
  /** 触发显示联想词下拉框的元素，默认为 Input 组件，可以使用 `trigger` 自定义为 Textarea 组件或其他组件 */
  triggerElement: {
    type: [String, Function] as PropType<TdAutoCompleteProps['triggerElement']>,
  },
  /** 输入框的值，即当前指定的联想词 */
  value: {
    type: String,
    default: undefined,
  },
  modelValue: {
    type: String,
    default: undefined,
  },
  /** 输入框的值，即当前指定的联想词，非受控属性 */
  defaultValue: {
    type: String,
    default: '',
  },
  /** 失去焦点时触发 */
  onBlur: Function as PropType<TdAutoCompleteProps['onBlur']>,
  /** 输入框值发生变化时触发 */
  onChange: Function as PropType<TdAutoCompleteProps['onChange']>,
  /** 清空按钮点击时触发 */
  onClear: Function as PropType<TdAutoCompleteProps['onClear']>,
  /** 中文输入结束时触发 */
  onCompositionend: Function as PropType<TdAutoCompleteProps['onCompositionend']>,
  /** 中文输入开始时触发 */
  onCompositionstart: Function as PropType<TdAutoCompleteProps['onCompositionstart']>,
  /** 回车键按下时触发 */
  onEnter: Function as PropType<TdAutoCompleteProps['onEnter']>,
  /** 获得焦点时触发 */
  onFocus: Function as PropType<TdAutoCompleteProps['onFocus']>,
  /** 选中联想词时触发 */
  onSelect: Function as PropType<TdAutoCompleteProps['onSelect']>,
};

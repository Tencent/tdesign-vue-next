

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdInputProps } from './type';
import { PropType } from 'vue';

export default {
  /** 文本内容位置，居左/居中/居右 */
  align: {
    type: String as PropType<TdInputProps['align']>,
    default: 'left' as TdInputProps['align'],
    validator(val: TdInputProps['align']): boolean {
      if (!val) return true;
      return ['left', 'center', 'right'].includes(val);
    },
  },
  /** 超出 `maxlength` 或 `maxcharacter` 之后是否允许继续输入 */
  allowInputOverMax: Boolean,
  /** 宽度随内容自适应 */
  autoWidth: Boolean,
  /** 是否开启自动填充功能，HTML5 原生属性，[点击查看详情](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) */
  autocomplete: {
    type: String,
    default: undefined,
  },
  /** 自动聚焦 */
  autofocus: Boolean,
  /** 【开发中】无边框模式 */
  borderless: Boolean,
  /** 是否可清空 */
  clearable: Boolean,
  /** 是否禁用输入框 */
  disabled: Boolean,
  /** 指定输入框展示值的格式。注意 `type=number` 时请勿使用，此功能建议更为使用 `InputNumber` 组件 */
  format: {
    type: Function as PropType<TdInputProps['format']>,
  },
  /** t-input 同级类名，示例：'name1 name2 name3' 或 `['name1', 'name2']` 或 `[{ 'name1': true }]` */
  inputClass: {
    type: [String, Object, Array] as PropType<TdInputProps['inputClass']>,
  },
  /** 左侧文本 */
  label: {
    type: [String, Function] as PropType<TdInputProps['label']>,
  },
  /** 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用 */
  maxcharacter: {
    type: Number,
  },
  /** 用户最多可以输入的文本长度，一个中文等于一个计数长度。值为空，则表示不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用 */
  maxlength: {
    type: [String, Number] as PropType<TdInputProps['maxlength']>,
  },
  /** 名称 */
  name: {
    type: String,
    default: '',
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: undefined,
  },
  /** 组件前置图标 */
  prefixIcon: {
    type: Function as PropType<TdInputProps['prefixIcon']>,
  },
  /** 只读状态 */
  readonly: Boolean,
  /** 输入框内容为空时，悬浮状态是否显示清空按钮，默认不显示 */
  showClearIconOnEmpty: Boolean,
  /** 是否在输入框右侧显示字数统计 */
  showLimitNumber: Boolean,
  /** 输入框尺寸 */
  size: {
    type: String as PropType<TdInputProps['size']>,
    default: 'medium' as TdInputProps['size'],
    validator(val: TdInputProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 输入框状态。默认情况会由组件内部根据实际情况呈现，如果文本过长引起的状态变化 */
  status: {
    type: String as PropType<TdInputProps['status']>,
    default: undefined as TdInputProps['status'],
    validator(val: TdInputProps['status']): boolean {
      if (!val) return true;
      return ['default', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 后置图标前的后置内容 */
  suffix: {
    type: [String, Function] as PropType<TdInputProps['suffix']>,
  },
  /** 组件后置图标 */
  suffixIcon: {
    type: Function as PropType<TdInputProps['suffixIcon']>,
  },
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<TdInputProps['tips']>,
  },
  /** 输入框类型。`type=number` 仅支持最基础的数字输入功能，更多功能建议使用 `InputNumber` 组件 */
  type: {
    type: String as PropType<TdInputProps['type']>,
    default: 'text' as TdInputProps['type'],
    validator(val: TdInputProps['type']): boolean {
      if (!val) return true;
      return ['text', 'number', 'url', 'tel', 'password', 'search', 'submit', 'hidden'].includes(val);
    },
  },
  /** 输入框的值 */
  value: {
    type: [String, Number] as PropType<TdInputProps['value']>,
    default: undefined as TdInputProps['value'],
  },
  modelValue: {
    type: [String, Number] as PropType<TdInputProps['value']>,
    default: undefined as TdInputProps['value'],
  },
  /** 输入框的值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdInputProps['defaultValue']>,
  },
  /** 失去焦点时触发 */
  onBlur: Function as PropType<TdInputProps['onBlur']>,
  /** 输入框值发生变化时触发。参数 `trigger=initial` 表示传入的数据不符合预期，组件自动处理后触发 change 告知父组件。如：初始值长度超过 `maxlength` 限制 */
  onChange: Function as PropType<TdInputProps['onChange']>,
  /** 清空按钮点击时触发 */
  onClear: Function as PropType<TdInputProps['onClear']>,
  /** 点击组件时触发 */
  onClick: Function as PropType<TdInputProps['onClick']>,
  /** 中文输入结束时触发 */
  onCompositionend: Function as PropType<TdInputProps['onCompositionend']>,
  /** 中文输入开始时触发 */
  onCompositionstart: Function as PropType<TdInputProps['onCompositionstart']>,
  /** 回车键按下时触发 */
  onEnter: Function as PropType<TdInputProps['onEnter']>,
  /** 获得焦点时触发 */
  onFocus: Function as PropType<TdInputProps['onFocus']>,
  /** 键盘按下时触发 */
  onKeydown: Function as PropType<TdInputProps['onKeydown']>,
  /** 按下字符键时触发（keydown -> keypress -> keyup） */
  onKeypress: Function as PropType<TdInputProps['onKeypress']>,
  /** 释放键盘时触发 */
  onKeyup: Function as PropType<TdInputProps['onKeyup']>,
  /** 进入输入框时触发 */
  onMouseenter: Function as PropType<TdInputProps['onMouseenter']>,
  /** 离开输入框时触发 */
  onMouseleave: Function as PropType<TdInputProps['onMouseleave']>,
  /** 粘贴事件，`pasteValue` 表示粘贴板的内容 */
  onPaste: Function as PropType<TdInputProps['onPaste']>,
  /** 字数超出限制时触发 */
  onValidate: Function as PropType<TdInputProps['onValidate']>,
  /** 输入框中滚动鼠标时触发 */
  onWheel: Function as PropType<TdInputProps['onWheel']>,
};

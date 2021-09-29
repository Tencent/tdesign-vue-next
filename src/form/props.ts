/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-09-22 10:58:18
 * */

import { TdFormProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否在表单标签字段右侧显示冒号 */
  colon: Boolean,
  /** 表单数据 */
  data: {
    type: Object as PropType<TdFormProps['data']>,
    default: () => ({}),
  },
  /** 表单字段标签对齐方式：左对齐、右对齐、顶部对齐 */
  labelAlign: {
    type: String as PropType<TdFormProps['labelAlign']>,
    default: 'right' as TdFormProps['labelAlign'],
    validator(val: TdFormProps['labelAlign']): boolean {
      return ['left', 'right', 'top'].includes(val);
    },
  },
  /** 可以整体设置label标签宽度，默认为100px */
  labelWidth: {
    type: [String, Number] as PropType<TdFormProps['labelWidth']>,
    default: '100px',
  },
  /** 表单布局，有两种方式：纵向布局 和 行内布局 */
  layout: {
    type: String as PropType<TdFormProps['layout']>,
    default: 'vertical' as TdFormProps['layout'],
    validator(val: TdFormProps['layout']): boolean {
      return ['vertical', 'inline'].includes(val);
    },
  },
  /** 是否阻止表单提交默认事件，即提交后会刷新页面 */
  preventSubmitDefault: {
    type: Boolean,
    default: true,
  },
  /** 是否显示必填符号 */
  requiredMark: {
    type: Boolean,
    default: true,
  },
  /** 重置表单的方式，值为 empty 表示重置表单为空，值为 initial 表示重置表单数据为初始值 */
  resetType: {
    type: String as PropType<TdFormProps['resetType']>,
    default: 'empty' as TdFormProps['resetType'],
    validator(val: TdFormProps['resetType']): boolean {
      return ['empty', 'initial'].includes(val);
    },
  },
  /** 表单字段校验规则 */
  rules: {
    type: Object as PropType<TdFormProps['rules']>,
  },
  /** 表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。值为空则表示不滚动 */
  scrollToFirstError: {
    type: String as PropType<TdFormProps['scrollToFirstError']>,
    validator(val: TdFormProps['scrollToFirstError']): boolean {
      return ['smooth', 'auto'].includes(val);
    },
  },
  /** 校验不通过时，是否显示错误提示信息 */
  showErrorMessage: {
    type: Boolean,
    default: true,
  },
  /** 表单尺寸 */
  size: {
    type: String as PropType<TdFormProps['size']>,
    default: 'medium' as TdFormProps['size'],
    validator(val: TdFormProps['size']): boolean {
      return ['medium', 'large'].includes(val);
    },
  },
  /** 校验状态图标 */
  statusIcon: {
    type: [Boolean, Function] as PropType<TdFormProps['statusIcon']>,
    default: undefined,
  },
  /** 表单重置时触发 */
  onReset: Function as PropType<TdFormProps['onReset']>,
  /** 表单提交时触发。其中 validateResult 表示校验结果，firstError 表示校验不通过的第一个规则提醒 */
  onSubmit: Function as PropType<TdFormProps['onSubmit']>,
  /** 校验结束后触发 */
  onValidate: Function as PropType<TdFormProps['onValidate']>,
};

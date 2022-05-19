/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdFormItemProps } from '../form/type';
import { PropType } from 'vue';

export default {
  /** label 原生属性 */
  for: {
    type: String,
    default: '',
  },
  /** 表单项说明内容 */
  help: {
    type: [String, Function] as PropType<TdFormItemProps['help']>,
  },
  /** 字段标签名称 */
  label: {
    type: [String, Function] as PropType<TdFormItemProps['label']>,
    default: '',
  },
  /** 表单字段标签对齐方式：左对齐、右对齐、顶部对齐。默认使用 Form 的对齐方式，优先级高于 Form.labelAlign */
  labelAlign: {
    type: String as PropType<TdFormItemProps['labelAlign']>,
    validator(val: TdFormItemProps['labelAlign']): boolean {
      if (!val) return true;
      return ['left', 'right', 'top'].includes(val);
    },
  },
  /** 可以整体设置标签宽度，优先级高于 Form.labelWidth */
  labelWidth: {
    type: [String, Number] as PropType<TdFormItemProps['labelWidth']>,
  },
  /** 表单字段名称 */
  name: {
    type: String,
    default: '',
  },
  /** 是否显示必填符号（*），优先级高于 Form.requiredMark */
  requiredMark: {
    type: Boolean,
    default: undefined,
  },
  /** 表单字段校验规则 */
  rules: {
    type: Array as PropType<TdFormItemProps['rules']>,
    default: (): TdFormItemProps['rules'] => [],
  },
  /** 校验不通过时，是否显示错误提示信息，优先级高于 `Form.showErrorMessage` */
  showErrorMessage: {
    type: Boolean,
    default: undefined,
  },
  /** 校验状态图标，值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标。`statusIcon` 值类型为渲染函数，则可以自定义右侧状态图标。优先级高级 Form 的 statusIcon */
  statusIcon: {
    type: [Boolean, Function] as PropType<TdFormItemProps['statusIcon']>,
    default: undefined,
  },
  /** 是否显示校验成功的边框，默认不显示 */
  successBorder: Boolean,
};

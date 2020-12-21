import { CreateElement, VNode } from 'vue';

import { IsEmailOptions } from 'validator/es/lib/isEmail';
import { IsURLOptions } from 'validator/es/lib/isURL';

export interface FormProps {
  /**
   * 表单数据
   * @default -
   */
  data?: FormData;
  /**
   * 表单字段标签对齐方式：左对齐、右对齐、居中对齐
   * @default right
   */
  labelAlign?: 'left' | 'right' | 'top';
  /**
   * 表单布局，有两种方式：纵向布局 和 行内布局
   * @default vertical
   */
  layout?: 'vertical' | 'inline';
  /**
   * 表单尺寸
   * @default medium
   */
  size?: 'medium' | 'large';
  /**
   * 是否在表单标签字段右侧显示冒号
   * @default false
   */
  colon?: boolean;
  /**
   * 可以整体设置label标签宽度
   * @default false
   */
  labelWidth?: number | string;
  /**
   * 是否显示必填符号
   * @default true
   */
  requiredMark?: boolean;
  /**
   * 表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。值为空则表示不滚动。
   * @default -
   */
  scrollToFirstError?: 'smooth' | 'auto';
  /**
   * 校验不通过时，是否显示错误提示信息
   * @default true
   */
  showErrorMessage?: boolean;
  /**
   * 表单字段校验规则。
   * @default -
   */
  rules?: { [field: string]: Array<FormRuleTs> };
  /**
   * 表单重置时触发
   * @default -
   */
  // @ts-ignore
  onReset?: ({ e: Event }) => void;
  /**
   * 表单提交时触发
   * @default -
   */
  // @ts-ignore
  onSubmit?: ({ e: Event, FormValidateResult }) => void;
}

export interface FormItemProps {
  /**
   * 表单项说明内容
   * @default -
   */
  help?: string;
  /**
   * 表单字段名称
   * @default -
   */
  name?: string;
  /**
   * label 原生属性
   * @default -
   */
  for?: string;
  /**
   * 字段标签名称
   * @default -
   */
  label?: string | ((h: CreateElement) => VNode | Element);
  /**
   * 表单字段校验规则
   * @default -
   */
  rules?: Array<FormRuleTs>;
}

export interface FormRuleTs {
  /**
   * 校验未通过时呈现的错误信息吗，值为空则不显示
   * @default -
   */
  message?: string;
  /**
   * 校验触发方式
   * @default change
   */
  trigger?: 'change' | 'blur';
  /**
   * 自定义校验规则
   * @default -
   */
  validator?: CustomValidator;
  /**
   * 校验未通过时呈现的错误信息类型
   * @default error
   */
  type?: 'error' | 'warning';
  /**
   * 内置校验方法，校验值是否已经填写。该值为 true，默认显示必填标记
   * @default -
   */
  required?: boolean;
  /**
   * 内置校验方法，校验值是否为邮件格式
   * @default -
   */
  email?: boolean | IsEmailOptions;
  /**
   * 内置校验方法，校验值是否为邮件格式。
   * @default -
   */
  date?: boolean | IsDateOptions;
  /**
   * 内置校验方法，校验值是否为网络链接地址
   * @default -
   */
  url?: boolean | IsURLOptions;
  /**
   * 内置校验方法，校验值类型是否为布尔类型
   * @default -
   */
  boolean?: boolean;
  /**
   * 内置校验方法，校验值是否为数字（1.2 、 1e5  都算数字）
   * @default -
   */
  number?: boolean;
  /**
   * 内置校验方法，校验值最大长度，如：max: 100 表示值最多不能超过 100 个字符，中文表示 2 个字符，英文为 1 个字符
   * @default -
   */
  max?: number | boolean;
  /**
   * 内置校验方法，校验值最小长度，如：min: 10 表示值最多不能少于 10 个字符，中文表示 2 个字符，英文为 1 个字符
   * @default -
   */
  min?: number | boolean;
  /**
   * 内置校验方法，校验值固定长度，如：len: 10 表示值的字符长度只能等于 10 ，中文表示 2 个字符，英文为 1 个字符
   * @default -
   */
  len?: number | boolean;
  /**
   * 内置校验方法，校验值是否为身份证号码
   * @default -
   */
  idcard?: boolean;
  /**
   * 内置校验方法，校验值是否为手机号码
   * @default -
   */
  telnumber?: boolean;
  /**
   * 内置校验方法，校验值只能为列出的数据。示例，enum: ['primary', 'info', 'warning']
   * @default -
   */
  enum?: Array<string>;
  /**
   * 内置校验方法，校验值是否符合正则表达式匹配结果
   * @default -
   */
  pattern?: RegExp;
}

export type FormData = { [key: string]: any };

export type FormValidateResult = boolean | ValidateResult;

export interface ValidateResult {
  [key: string]: boolean | ErrorList;
}

export type ErrorList = Array<FormRuleTs>;

export type ValueType = any;

export type CustomValidator = (val: ValueType) => boolean | Promise<boolean>;


export interface IsDateOptions {
  format: string;
  strictMode: boolean;
  delimiters: string[];
}

// eslint-disable-next-line no-undef
export default FormProps;

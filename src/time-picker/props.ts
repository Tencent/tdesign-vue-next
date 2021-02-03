import { meridianBeforeFormatREG, meridianAfterFormatREG } from './constant';
import { PropType } from 'vue';

// 布尔类型
export const BooleanType = {
  type: Boolean,
  default: true,
  validator(v: boolean): boolean {
    return typeof v === 'boolean';
  },
};
// 字符串类型
export const StringType = {
  type: String,
  default: '',
  validator(v: string): boolean {
    return typeof v === 'string';
  },
};
// 方法类型
export const FunctionType = {
  type: [Function, undefined],
  default: (): any => undefined,
  validator(v: Function): boolean {
    return typeof v === 'function';
  },
};
// 数字类型
export const NumberType = {
  type: Number,
  default: 1,
  validator(v: number): boolean {
    return typeof v === 'number';
  },
};

// 对象 || 数组
const ObjectArrayType = {
  type: [Object, Array, undefined],
  default: (): any => undefined,
};

// 时间输出格式
const outputFormat = (v: string): boolean => meridianBeforeFormatREG.test(v) || meridianAfterFormatREG.test(v) || false;


export default () => ({
  clearable: {
    ...BooleanType,
  },
  className: {
    ...StringType,
  },
  defaultValue: {
    ...ObjectArrayType,
  },
  disabled: {
    ...BooleanType,
    ...({
      default: false,
    }),
  },
  hideDisabledTime: {
    ...BooleanType,
  },
  disabledHours: {
    ...FunctionType,
  },
  disabledMinutes: {
    ...FunctionType,
  },
  disabledSeconds: {
    ...FunctionType,
  },
  format: {
    type: String,
    default: 'HH:mm:ss',
    validator: outputFormat,
  },
  steps: {
    type: Array as PropType<Array<string | number>>,
    ...({
      default: [1, 1, 1],
    }),
  },
  readonly: {
    ...BooleanType,
    ...({
      default: false,
    }),
  },
  placeholder: {
    ...StringType,
    ...({
      default: '请选择时间',
    }),
  },
  value: {
    ...ObjectArrayType,
  },
  onChange: {
    ...FunctionType,
  },
  allowInput: {
    ...BooleanType,
  },
  size: {
    ...StringType,
    ...({
      default: 'small',
      validator(v: string): boolean {
        return [
          'small',
          'middle',
          'large',
        ].includes(v);
      },
    }),
  },
});

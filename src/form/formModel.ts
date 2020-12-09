import isEmail from 'validator/es/lib/isEmail';
import isEmpty from 'lodash/isEmpty';
import { ValueType, ValidateRule, ValidateOptions, ErrorObject } from './type';

/**
 * 为避免引入文件较多，组件仅内置部分校验方法，更多校验业务方自行实现
 */

const VALIDATE_MAP = {
  // `{} / [] / '' / undefined / null` 等内容被认为是空；
  // 0 和 false 被认为是正常数据，部分数据的值就是 0 或者 false
  required: (val: ValueType, op: boolean): boolean => {
    if (!op) return true;
    return typeof val === 'object'
      ? !isEmpty(val)
      : !['', undefined, null].includes(val);
  },
  email: (val: ValueType) => isEmail(val, {}),
  date: () => true,
  boolean: () => true,
  number: () => true,
  max: () => true,
  min: () => true,
  length: () => true,
  idcard: () => true,
  telnumber: () => true,
  url: () => true,
  enum: () => true,
  pattern: () => true,
};

// 校验某一条数据的某一条规则
export function validator(value: ValueType, rule: ValidateRule): boolean {
  let r = true;
  Object.keys(rule).forEach((key) => {
    const validateRule = VALIDATE_MAP[key];
    if (validateRule && rule[key]) {
      r = validateRule(value, rule[key]);
    }
  });
  return r;
}

// 全部数据校验
export function validate(list: Array<ValidateOptions>): boolean | ErrorObject {
  const errors = {};
  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i];
    errors[item.field] = [];
    for (let j = 0, len = item.rules.length; j < len; j++) {
      const rule = item.rules[j];
      const r = validator(item.value, rule);
      if (!r) {
        errors[item.field].push(rule);
      }
    }
    if (!errors[item.field].length) {
      delete errors[item.field];
    }
  }
  return Object.keys(errors).length ?  errors : true;
}

import isEmail from 'validator/es/lib/isEmail';
import isEmpty from 'lodash/isEmpty';
import { ValueType, ValidateRule, ValidateOptions, ValidateResult } from './type';

// `{} / [] / '' / undefined / null` 等内容被认为是空；
// 0 和 false 被认为是正常数据，部分数据的值就是 0 或者 false
export function isValueEmpty(val: ValueType): boolean {
  return typeof val === 'object'
    ? isEmpty(val)
    : ['', undefined, null].includes(val);
}

/**
 * 为避免引入文件较多，组件仅内置部分校验方法，更多校验业务方自行实现
 */

const VALIDATE_MAP = {
  required: (val: ValueType): boolean => !isValueEmpty(val),
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
export function validate(list: Array<ValidateOptions>): ValidateResult {
  const errors = {};
  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i];
    errors[item.field] = [];
    for (let j = 0, len = item.rules.length; j < len; j++) {
      const rule = item.rules[j];
      // 必填 或 值不为空 时可以进入校验机
      const r = (!isValueEmpty(item.value) || rule.required)
        ? validator(item.value, rule)
        : true;
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

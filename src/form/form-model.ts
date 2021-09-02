// https://github.com/validatorjs/validator.js

import isEmail from 'validator/lib/isEmail';
import isDate from 'validator/lib/isDate';
import isURL from 'validator/lib/isURL';
import isEmpty from 'lodash/isEmpty';
import {
  ValueType, FormRule, CustomValidator, ErrorList,
} from './type';

// `{} / [] / '' / undefined / null` 等内容被认为是空； 0 和 false 被认为是正常数据，部分数据的值就是 0 或者 false
export function isValueEmpty(val: ValueType): boolean {
  const type: string = Object.prototype.toString.call(val);
  const typeMap: Record<string, any> = {
    Date: '[object Date]',
  };
  if (type === typeMap.Date) {
    return false;
  }
  return typeof val === 'object'
    ? isEmpty(val)
    : ['', undefined, null].includes(val);
}

/**
 * 为避免引入文件较多，组件仅内置部分校验方法，更多校验业务方自行实现
 */

function getStringLength(str: string): number {
  if (!str || str.length === 0) return 0;
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
}

const VALIDATE_MAP = {
  date: isDate,
  url: isURL,
  email: isEmail,
  required: (val: ValueType): boolean => !isValueEmpty(val),
  boolean: (val: ValueType): boolean => typeof val === 'boolean',
  max: (val: ValueType, num: number): boolean => getStringLength(val) <= num,
  min: (val: ValueType, num: number): boolean => val.length >= num,
  len: (val: ValueType, num: number): boolean => val.length === num,
  number: (val: ValueType): boolean => !isNaN(val),
  enum: (val: ValueType, strs: Array<string>): boolean => strs.includes(val),
  idcard: (val: ValueType): boolean => /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/i.test(val),
  telnumber: (val: ValueType): boolean => /^1[3-9]\d{9}$/.test(val),
  pattern: (val: ValueType, regexp: RegExp): boolean => regexp.test(val),
  // 自定义校验规则，可能是异步校验
  validator: (val: ValueType, validate: CustomValidator): boolean | Promise<boolean> => validate(val),
};

// 校验某一条数据的某一条规则
export function validateOneRule(
  value: ValueType,
  rule: FormRule,
): Promise<boolean | FormRule> {
  return new Promise((resolve) => {
    let r: boolean | Promise<boolean> = true;
    Object.keys(rule).forEach((key) => {
      // 非必填选项，值为空，返回 true
      if (!rule.required && isValueEmpty(value)) {
        resolve(true);
        return;
      }
      const validateRule = VALIDATE_MAP[key];
      if (validateRule && rule[key]) {
        // rule 值为 true 则表示没有校验参数，只是对值进行默认规则校验
        const options = rule[key] === true ? {} : rule[key];
        r = validateRule(value, options);
        // 校验结果可能是异步 Promise
        if (r instanceof Promise) {
          r.then((result) => {
            resolve(result || rule);
          });
        } else {
          resolve(r || rule);
        }
      }
    });
  });
}

// 全部数据校验
export function validate(value: ValueType, rules: Array<FormRule>): Promise<ErrorList> {
  return new Promise((resolve) => {
    const all = rules.map((rule) => validateOneRule(value, rule));
    Promise.all(all).then((arr) => {
      const r = arr.filter((item) => item !== true) as ErrorList;
      resolve(r);
    });
  });
}

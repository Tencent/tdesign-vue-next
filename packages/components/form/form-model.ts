import { isBoolean } from 'lodash-es';
import { isObject } from 'lodash-es';
// https://github.com/validatorjs/validator.js

import isDate from 'validator/lib/isDate';
import isEmail from 'validator/lib/isEmail';
import { isEmpty } from 'lodash-es';
import isURL from 'validator/lib/isURL';
import { isNumber } from 'lodash-es';
import { getCharacterLength } from '../../common/js/utils/helper';
import {
  CustomValidator,
  FormRule,
  ValueType,
  AllValidateResult,
  ValidateResultType,
  CustomValidateResolveType,
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
  return isObject(val) ? isEmpty(val) : ['', undefined, null].includes(val);
}

const VALIDATE_MAP = {
  date: isDate,
  url: isURL,
  email: isEmail,
  required: (val: ValueType): boolean => !isValueEmpty(val),
  whitespace: (val: ValueType): boolean => !(/^\s+$/.test(val) || val === ''),
  boolean: (val: ValueType): boolean => isBoolean(val),
  max: (val: ValueType, num: number): boolean => (isNumber(val) ? val <= num : getCharacterLength(val) <= num),
  min: (val: ValueType, num: number): boolean => (isNumber(val) ? val >= num : getCharacterLength(val) >= num),
  len: (val: ValueType, num: number): boolean => getCharacterLength(String(val)) === num,
  number: (val: ValueType): boolean => isNumber(val),
  enum: (val: ValueType, strs: Array<string>): boolean => strs.includes(val),
  idcard: (val: ValueType): boolean => /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/i.test(val),
  telnumber: (val: ValueType): boolean => /^1[3-9]\d{9}$/.test(val),
  pattern: (val: ValueType, regexp: RegExp): boolean => regexp.test(val),
  // 自定义校验规则，可能是异步校验
  validator: (val: ValueType, validate: CustomValidator): ReturnType<CustomValidator> => validate(val),
};

export type ValidateFuncType = typeof VALIDATE_MAP[keyof typeof VALIDATE_MAP];

/**
 * 校验某一条数据的某一条规则，一种校验规则不满足则不再进行校验。
 * @param value 值
 * @param rule 校验规则
 * @returns 两种校验结果，一种是内置校验规则的校验结果哦，二种是自定义校验规则（validator）的校验结果
 */
export async function validateOneRule(value: ValueType, rule: FormRule): Promise<AllValidateResult> {
  let validateResult: CustomValidateResolveType | ValidateResultType = { result: true };
  const keys = Object.keys(rule) as (keyof FormRule)[];
  let vOptions: undefined | FormRule[keyof FormRule];
  let vValidateFun: ValidateFuncType;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    // 非必填选项，值为空，非自定义规则：无需校验，直接返回 true
    if (!rule.required && isValueEmpty(value) && !rule.validator) {
      return validateResult;
    }
    // @ts-ignore
    // TODO: 😭
    const validateRule: ValidateFuncType = VALIDATE_MAP[key];
    // 找到一个校验规则，则无需再找，因为参数只允许对一个规则进行校验
    if (validateRule && (rule[key] || rule[key] === 0)) {
      // rule 值为 true 则表示没有校验参数，只是对值进行默认规则校验
      vOptions = rule[key] === true ? undefined : rule[key];
      vValidateFun = validateRule;
      break;
    }
  }
  if (vValidateFun) {
    // @ts-ignore
    // TODO: 😭
    validateResult = await vValidateFun(value, vOptions);
    // 如果校验不通过，则返回校验不通过的规则
    if (isBoolean(validateResult)) {
      return { ...rule, result: validateResult };
    }
    // 校验结果为 CustomValidateObj，只有自定义校验规则会存在这种情况
    if (isObject(validateResult)) {
      return validateResult;
    }
  }
  return validateResult;
}

// 单个数据进行全规则校验，校验成功也可能会有 message
export async function validate(value: ValueType, rules: Array<FormRule>): Promise<AllValidateResult[]> {
  const all = rules.map((rule) => validateOneRule(value, rule));
  const r = await Promise.all(all);
  return r;
}

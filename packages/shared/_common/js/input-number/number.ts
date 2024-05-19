import isUndefined from 'lodash/isUndefined';
/** 普通数相关方法 */
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import {
  compareNumber,
  formatENumber,
  largeNumberToFixed,
  isInputNumber,
  largeNumberAdd,
  largeNumberSubtract,
} from './large-number';
import log from '../log';

export * from './large-number';

export type NumberType = number | string;

// 小于最大值，才允许继续添加
export function canAddNumber(
  num: NumberType,
  max: NumberType,
  largeNumber = false
): boolean {
  if (!num && num !== 0) return true;
  if (largeNumber && isString(num)) {
    return compareNumber(num, max, largeNumber) < 0;
  }
  return num < max;
}

// 大于最小值，才允许继续减少
export function canReduceNumber(
  num: NumberType,
  min: NumberType,
  largeNumber = false
): boolean {
  if (!num && num !== 0) return true;
  if (largeNumber && isString(num)) {
    return compareNumber(num, min, largeNumber) > 0;
  }
  return num > min;
}

/**
 * 将数字控制在 max 和 min 之间
 */
export function putInRangeNumber(
  val: NumberType,
  params: {
    max?: NumberType;
    min?: NumberType;
    lastValue?: NumberType;
    largeNumber?: boolean;
  }
) {
  if (val === '') return undefined;
  const { max, min, lastValue, largeNumber } = params;
  if (!isInputNumber(val)) return lastValue;
  if (largeNumber && (isString(max) || max === Infinity) && (isString(min) || min === -Infinity)) {
    if (compareNumber(max, val, largeNumber) < 0) return max;
    if (compareNumber(min, val, largeNumber) > 0) return min;
    return val;
  }
  return Math.max(Number(min), Math.min(Number(max), Number(val)));
}

/**
 * 仅支持正数，小数加法精度处理，小数部分和整数部分分开处理
 */
export function positiveAdd(num1: number, num2: number): number {
  if (!num1 || !num2) return (num1 || 0) + (num2 || 0);
  const r1 = num1.toString().split('.')[1]?.length || 0;
  const r2 = num2.toString().split('.')[1]?.length || 0;
  // 整数不存在精度问题，直接返回
  if (!r1 && !r2) return num1 + num2;
  let newNumber1 = num1;
  let newNumber2 = num2;
  const diff = Math.abs(r1 - r2);
  const digit = 10 ** Math.max(r1, r2);
  if (diff > 0) {
    const cm = 10 ** diff;
    if (r1 > r2) {
      newNumber1 = Number(num1.toString().replace('.', ''));
      newNumber2 = Number(num2.toString().replace('.', '')) * cm;
    } else {
      newNumber1 = Number(num1.toString().replace('.', '')) * cm;
      newNumber2 = Number(num2.toString().replace('.', ''));
    }
  } else {
    newNumber1 = Number(num1.toString().replace('.', ''));
    newNumber2 = Number(num2.toString().replace('.', ''));
  }
  return (newNumber1 + newNumber2) / digit;
}

/**
 * 正数，小数减法精度处理，小数部分和整数部分分开处理
 */
export function positiveSubtract(num1: number, num2: number): number {
  if (!num1 || !num2) return (num1 || 0) - (num2 || 0);
  const r1 = num1.toString().split('.')[1]?.length || 0;
  const r2 = num2.toString().split('.')[1]?.length || 0;
  const digit = 10 ** Math.max(r1, r2);
  const n = r1 >= r2 ? r1 : r2;
  return Number(((num1 * digit - num2 * digit) / digit).toFixed(n));
}

/**
 * 支持正数、负数、小数等全部数字的加法
 * -0.766 + 1       =>   1 - 0.766
 * -1 + (-0.766)    =>   - (1 + 0.766)
 * 1 + (-0.766)     =>   1 - 0.766
 * 1 + 0.766        =>   1 + 0.766
 */
export function add(num1: number, num2: number): number {
  if (num1 < 0 && num2 > 0) return positiveSubtract(num2, Math.abs(num1));
  if (num1 < 0 && num2 < 0) return positiveAdd(Math.abs(num1), Math.abs(num2)) * -1;
  if (num1 > 0 && num2 < 0) return positiveSubtract(num1, Math.abs(num2));
  return positiveAdd(num1, num2);
}

/**
 * 支持正数、负数、小数等全部数字的减法
 * -0.766 - 1       =>   - (1 + 0.766)
 * -1 - (-0.766)    =>   0.766 - 1
 * 1 - (-0.766)     =>   1 + 0.766
 * 1 - 0.766        =>   1 - 0.766
 */
export function subtract(num1: number, num2: number): number {
  if (num1 < 0 && num2 > 0) return positiveAdd(Math.abs(num1), num2) * -1;
  if (num1 < 0 && num2 < 0) return positiveSubtract(Math.abs(num2), Math.abs(num1));
  if (num1 > 0 && num2 < 0) return positiveAdd(num1, Math.abs(num2));
  return positiveSubtract(num1, num2);
}

export function getStepValue(p: {
  op: 'add' | 'reduce';
  step: NumberType;
  max?: NumberType;
  min?: NumberType;
  lastValue?: NumberType;
  largeNumber?: boolean;
}) {
  const { op, step, lastValue, max, min, largeNumber } = p;
  if (step <= 0) {
    log.error('InputNumber', 'step must be larger than 0.');
    return lastValue;
  }
  const tStep = isNumber(step) ? String(step) : step;
  let newVal;
  if (op === 'add') {
    if (largeNumber && isString(lastValue)) {
      newVal = largeNumberAdd(String(lastValue), String(tStep));
    } else {
      newVal = add(Number(lastValue || 0), Number(step));
    }
  } else if (op === 'reduce') {
    if (largeNumber && isString(lastValue)) {
      newVal = largeNumberSubtract(String(lastValue), String(tStep));
    } else {
      newVal = subtract(Number(lastValue || 0), Number(step));
    }
  }
  if (isUndefined(lastValue)) {
    newVal = putInRangeNumber(newVal, { max, min, lastValue, largeNumber });
  }
  return largeNumber ? newVal : Number(newVal);
}

export type InputNumberErrorType =
  | 'exceed-maximum'
  | 'below-minimum'
  | undefined;

/**
 * 最大值和最小值校验
 */
export function getMaxOrMinValidateResult(p: {
  largeNumber: boolean;
  value: NumberType;
  max: NumberType;
  min: NumberType;
}): InputNumberErrorType {
  const { largeNumber, value, max, min } = p;
  if (isUndefined(largeNumber)) return undefined;
  if (largeNumber && isNumber(value)) {
    log.warn('InputNumber', 'largeNumber value must be a string.');
  }
  let error: InputNumberErrorType;
  if (compareNumber(value, max, largeNumber) > 0) {
    error = 'exceed-maximum';
  } else if (compareNumber(value, min, largeNumber) < 0) {
    error = 'below-minimum';
  } else {
    error = undefined;
  }
  return error;
}

export const specialCode = ['-', '.', 'e', 'E', '+'];

/**
 * 是否允许输入当前字符，输入字符校验
 * 1.23E+08 就表示 1.23 乘 10 的 8 次方
 * 2e3 表示 2 乘 10 的 3 次方
 */
export function canInputNumber(number: string, largeNumber: boolean) {
  if (['', null, undefined].includes(number)) return true;
  // 数字最前方不允许出现连续的两个 0
  if (number.slice(0, 2) === '00') return false;
  // 只能出现一个点（.）
  if (number.match(/\./g)?.length > 1) return false;
  // 只能出现一个负号（-）或 一个正号（+），并且在第一个位置；但允许 3e+10 这种形式
  const tmpNumber = number.slice(1);
  if (/(\+|-)/.test(tmpNumber) && !/e+/i.test(tmpNumber)) return false;
  // 允许输入数字字符
  const isNumber = (largeNumber && isInputNumber(number)) || !Number.isNaN(Number(number));
  if (!isNumber && !specialCode.includes(number.slice(-1))) return false;
  if (/e/i.test(number) && !/\de/i.test(number)) return false;
  return true;
}

/**
 * 是否允许设置组件新值，触发 onChange 事件
 */
export function canSetValue(number: string, lastNumber: number) {
  return parseFloat(number) !== lastNumber && !Number.isNaN(Number(number));
}

/**
 * 1. 格式化未输入完成的数字，如：如：2e/2+/2.等
 * 2. 处理小数点 decimalPlaces
 * 3. 格式化大数字 formatENumber
 */
export function formatUnCompleteNumber(
  number: string,
  extra: {
    decimalPlaces?: number;
    largeNumber?: boolean;
    isToFixed?: boolean;
  } = {}
): number | string {
  if (['', null, undefined].includes(number) || !/\d+/.test(number)) return undefined;
  const { decimalPlaces, largeNumber, isToFixed } = extra;
  let newNumber = number.replace(/[.|+|\-|e]$/, '');
  if (largeNumber) {
    newNumber = formatENumber(newNumber);
  }
  if (decimalPlaces !== undefined) {
    newNumber = largeNumberToFixed(newNumber, decimalPlaces, largeNumber);
  }
  if (largeNumber) return newNumber;
  return isToFixed ? newNumber : parseFloat(newNumber);
}

/**
 * 对千分位进行处理 111,111,222 -> 111111222
 */
export function formatThousandths(number: string) {
  const thousandthsRegExp = /^[-+]?\d{1,3}(,\d{3})*(\.(\d*))?$/;
  if (thousandthsRegExp.test(number)) return number.replace(/,/g, '');
  return number;
}

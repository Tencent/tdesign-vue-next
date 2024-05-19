import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import log from '../log/log';

export function fillZero(length: number) {
  return new Array(length).fill(0).join('');
}

/**
 * 大数，是否是一个数字，数字字符包括 - . e [0-9]
 */
export function isInputNumber(num: number | string): boolean {
  if (!num) return true;
  if (isNumber(num)) return !Number.isNaN(num);
  const r = /^[0-9|e|E|-]+\.*[0-9|e|E|-]*$/.test(num);
  if (!r) return false;
  // only allow one [.e] and two [-]
  let eCount = 0;
  let negativeCount = 0;
  let dotCount = 0;
  for (let i = 0, len = num.length; i < len; i++) {
    if (num[i] === '.') {
      dotCount += 1;
      if (dotCount > 1) return false;
    }
    if (/(e|E)+/.test(num[i])) {
      eCount += 1;
      if (eCount > 1) return false;
    }
    if (num[i] === '-') {
      negativeCount += 1;
      if (negativeCount > 2) return false;
    }
  }
  return true;
}

// 整数，去除前面的无效 0（本身是 0 除外）；小数去除末尾的无效 0
export function removeInvalidZero(num: string, decimal = false) {
  if (num.indexOf('.') !== -1) {
    log.error('InputNumber', 'num is not a integer number.');
    return num;
  }
  if (!num || (num === '0' && decimal)) return '';
  if (num === '0') return num;
  return (decimal ? num.replace(/0+$/, '') : num.replace(/^0+/, '')) || '0';
}

/**
 * 大数加法，仅支持正整数（没有精度问题）
 * @param num1 被加数
 * @param num2 加数
 */
export function largeIntNumberAdd(num1: string, num2: string, decimal = false): string {
  const number1 = removeInvalidZero(num1, decimal);
  const number2 = removeInvalidZero(num2, decimal);
  const isFirstLarger = number1.length > number2.length;
  const maxNumber = isFirstLarger ? number1 : number2;
  const minNumber = isFirstLarger ? number2 : number1;
  const newNumber: string[] = [];
  const step = [];
  const diff = decimal ? 0 : maxNumber.length - minNumber.length;
  const len = decimal ? minNumber.length : maxNumber.length;
  for (let i = len - 1; i >= 0; i--) {
    const minIndex = i - diff;
    // 第一个数，加第二个数，加进位
    const count = Number(maxNumber[i]) + (Number(minNumber[minIndex]) || 0) + (step[i] || 0);
    if (count >= 10) {
      step[i - 1] = 1;
    }
    newNumber.unshift(String(count % 10));
  }
  // 999 + 1 = 1000，之类的进位
  if (step[-1]) {
    newNumber.unshift('1');
  }
  if (decimal) {
    return newNumber.concat(maxNumber.slice(len, maxNumber.length)).join('');
  }
  return newNumber.join('');
}

/**
 * 大数加法，支持小数和整数（没有精度问题）
 * @param num1 被加数
 * @param num2 加数
 */
export function largePositiveNumberAdd(num1: string, num2: string): string {
  const [intNumber1 = '0', decimalNumber1 = '0'] = num1.split('.');
  const [intNumber2 = '0', decimalNumber2 = '0'] = num2.split('.');
  const integerSum = largeIntNumberAdd(intNumber1, intNumber2);
  // 如果不存在小数，则直接返回整数相加结果
  if (decimalNumber1 === '0' && decimalNumber2 === '0') return integerSum;
  const newDecimalNumber1 = removeInvalidZero(decimalNumber1, true);
  const newDecimalNumber2 = removeInvalidZero(decimalNumber2, true);
  // 小数点相加
  const decimalNumberSum = largeIntNumberAdd(newDecimalNumber1, newDecimalNumber2, true);
  // 组合整数部分和小数部分
  const decimalLength = decimalNumberSum.length;
  // 如果小数相加进位
  if (decimalLength > newDecimalNumber1.length && decimalLength > newDecimalNumber2.length) {
    return [
      removeInvalidZero(largeIntNumberAdd(integerSum, '1')),
      removeInvalidZero(decimalNumberSum.slice(1), true),
    ].filter((v: string) => v).join('.');
  }
  return [
    removeInvalidZero(integerSum),
    removeInvalidZero(decimalNumberSum, true)
  ].filter((v: string) => v).join('.');
}

/**
 * 比较两个大数的大小，仅正整数有效
 */
function compareLargeIntegerNumber(num1: string, num2: string): 1 | -1 | 0 {
  const number1 = removeInvalidZero(num1);
  const number2 = removeInvalidZero(num2);
  if (number1.length === number2.length) {
    for (let i = 0, len = number1.length; i < len; i++) {
      if (number1[i] > number2[i]) return 1;
      if (number1[i] < number2[i]) return -1;
    }
    return 0;
  }
  return number1.length > number2.length ? 1 : -1;
}

function compareLargeDecimalNumber(num1: string, num2: string) {
  const number1 = num1 && num1 !== '0' ? num1.replace(/0+$/, '') : '0';
  const number2 = num2 && num2 !== '0' ? num2.replace(/0+$/, '') : '0';
  const maxLength = Math.max(number1.length, number2.length);
  for (let i = 0, len = maxLength; i < len; i++) {
    if ((number1[i] || 0) > (number2[i] || 0)) return 1;
    if ((number1[i] || 0) < (number2[i] || 0)) return -1;
  }
  return 0;
}

/**
 * 2e3 => 2000
 * 0.2e3 => 200
 */
export function formatENumber(num: string): string {
  const [num1, num2] = num.split('e');
  if (!num2) return num;
  const [integer, initDecimal = ''] = num.split('.');
  const zeroCount = Number(num2);
  const [decimal] = initDecimal.split('e');
  if (zeroCount > decimal.length) {
    const multipleZero = fillZero(zeroCount - decimal.length);
    return num1.replace(/(^0+|\.)/g, '') + multipleZero;
  }
  const n1 = integer.replace(/^0+/, '') + decimal.slice(0, zeroCount);
  const d2 = decimal.slice(zeroCount);
  return d2 ? [n1, d2].join('.') : n1;
}

/**
 * 比较两个大数的大小
 */
export function compareLargeNumber(
  num1: string,
  num2: string,
): 1 | -1 | 0 {
  const [integer1, decimal1] = formatENumber(num1).split('.');
  const [integer2, decimal2] = formatENumber(num2).split('.');
  const result = compareLargeIntegerNumber(integer1.replace('-', ''), integer2.replace('-', ''));
  const integer1IsNegative = integer1.includes('-');
  const integer2IsNegative = integer2.includes('-');
  if (integer1IsNegative && !integer2IsNegative) return -1;
  if (!integer1IsNegative && integer2IsNegative) return 1;
  if (integer1IsNegative && integer2IsNegative) {
    if (result === 0) return 0;
    return result > 0 ? -1 : 1;
  }
  if (result === 0) {
    return compareLargeDecimalNumber(decimal1, decimal2);
  }
  return result;
}

// 确认是否为无限大/小
export function isInfinity(num: number| string) {
  return [-Infinity, Infinity].includes(Number(num));
}

// 确认是否是大数
export function isSafeNumber(num: string | number) {
  return Number(num) < Number.MAX_SAFE_INTEGER && Number(num) > Number.MIN_SAFE_INTEGER;
}

/**
 * 比较两个数的大小
 */
export function compareNumber(
  num1: string | number,
  num2: string | number,
  largeNumber?: boolean,
) {
  const isSafeNumberCompare = isSafeNumber(num1) && isSafeNumber(num2) && !largeNumber;
  const isInfinityCompare = isInfinity(num1) || isInfinity(num2);
  if (isSafeNumberCompare || isInfinityCompare) {
    // 比较两个非大数或涉及无穷的大小
    if (Number(num1) === Number(num2)) return 0;
    return Number(num1) > Number(num2) ? 1 : -1;
  }
  // 比较两个大数的大小
  return compareLargeNumber(String(num1), String(num2));
}

/**
 * 大数减法，仅支持整数
 * @param num1 被减数
 * @param num2 减数
 * @param decimal 是否为小数位相减
 */
export function largeIntegerNumberSubtract(
  num1: string, num2: string, p?: { decimal?: boolean, stayZero?: boolean }
): string {
  if (num1 === num2) return '0';
  const { decimal, stayZero } = p || {};
  const number1 = removeInvalidZero(num1);
  const number2 = removeInvalidZero(num2);
  const isFirstLarger = compareLargeIntegerNumber(number1, number2) > 0;
  const maxNumber = isFirstLarger ? number1 : number2;
  const minNumber = isFirstLarger ? number2 : number1;
  const newNumber: string[] = [];
  // step 存储借位信息
  const step = [];
  const diff = decimal ? 0 : maxNumber.length - minNumber.length;
  const len = decimal ? minNumber.length : maxNumber.length;
  for (let i = len - 1; i >= 0; i--) {
    const minIndex = i - diff;
    // 第一个数，减第二个数，减借位
    let count = Number(maxNumber[i]) - (Number(minNumber[minIndex]) || 0) - (step[i] || 0);
    if (count < 0) {
      step[i - 1] = 1;
      count += 10;
    }
    newNumber.unshift(String(count));
  }
  if (decimal) {
    return newNumber.concat(maxNumber.slice(len, maxNumber.length)).join('');
  }
  let finalNumber = newNumber.join('');
  if (!stayZero) {
    finalNumber = finalNumber.replace(/^0+/, '');
  }
  return removeInvalidZero(isFirstLarger ? finalNumber : `-${finalNumber}`);
}

/**
 * 大数减法，支持整数和小数（无精度问题）
 * @param num1 被减数
 * @param num2 减数
 * @param decimal 是否为小数位相减
 */
export function largePositiveNumberSubtract(num1: string, num2: string): string {
  if (num1 === num2) return '0';
  const isFirstLarger = compareNumber(num1, num2, true) > 0;
  const maxNumber = isFirstLarger ? num1 : num2;
  const minNumber = isFirstLarger ? num2 : num1;
  // 整数部分和小数部分分开处理
  const [intNumber1, decimalNumber1 = '0'] = maxNumber.split('.');
  const [intNumber2, decimalNumber2 = '0'] = minNumber.split('.');
  let integerNumber = largeIntegerNumberSubtract(intNumber1, intNumber2);
  // 如果不存在小数，则直接返回整数相加结果
  if (decimalNumber1 === '0' && decimalNumber2 === '0') {
    return isFirstLarger ? integerNumber : `-${integerNumber}`;
  }
  // 小数点相减
  let decimalNumber = '';
  let addOneNumber = decimalNumber1;
  // 第一个数字的小数位数比第二个少，需补足 0
  if (decimalNumber1.length < decimalNumber2.length) {
    addOneNumber = `${decimalNumber1}${fillZero(decimalNumber2.length - decimalNumber1.length)}`;
  }
  // 第一个小数位更小，是否需要借位
  if (compareLargeDecimalNumber(addOneNumber, decimalNumber2) >= 0) {
    decimalNumber = largeIntegerNumberSubtract(addOneNumber, decimalNumber2, { decimal: true });
  } else {
    if (decimalNumber1.length < decimalNumber2.length || decimalNumber1 === '0') {
      decimalNumber = largeIntegerNumberSubtract(`1${addOneNumber}`, decimalNumber2, { stayZero: true });
      decimalNumber = fillZero(decimalNumber2.length - decimalNumber.length) + decimalNumber;
    } else {
      decimalNumber = largeIntegerNumberSubtract(decimalNumber1, decimalNumber2, { decimal: true });
    }
    integerNumber = largeIntegerNumberSubtract(integerNumber, '1');
  }
  const finalNumber = decimalNumber ? [integerNumber, decimalNumber].join('.') : integerNumber;
  return isFirstLarger ? finalNumber : `-${finalNumber}`;
}

/**
 * -0.6 - 0.8        =>  -(0.6 + 0.8)
 * -0.6 - (-0.8)     =>  0.8 - 0.6
 * 0.6 - (-0.8)      => 0.6 + 0.8
 * 0.6 - 0.8         => 0.6 - 0.8
 */
export function largeNumberSubtract(num1: string, num2: string): string {
  const isFirstNegative = num1[0] === '-';
  const isSecondNegative = num2[0] === '-';
  if (isFirstNegative && !isSecondNegative) {
    const r = largePositiveNumberAdd(num1.slice(1), num2);
    return `-${r}`;
  }
  if (isFirstNegative && isSecondNegative) {
    return largePositiveNumberSubtract(num2.slice(1), num1.slice(1));
  }
  if (!isFirstNegative && isSecondNegative) {
    return largePositiveNumberAdd(num1, num2.slice(1));
  }
  return largePositiveNumberSubtract(num1, num2);
}

/**
 * -0.6 + 0.8        =>  0.8 - 0.6
 * -0.6 + (-0.8)     =>  -(0.6 + 0.8)
 * 0.6 + (-0.8)      => 0.6 - 0.8
 * 0.6 + 0.8         => 0.6 + 0.8
 */
export function largeNumberAdd(num1: string, num2: string): string {
  const isFirstNegative = num1[0] === '-';
  const isSecondNegative = num2[0] === '-';
  if (isFirstNegative && !isSecondNegative) {
    return largePositiveNumberSubtract(num2, num1.slice(1));
  }
  if (isFirstNegative && isSecondNegative) {
    const r = largePositiveNumberAdd(num2.slice(1), num1.slice(1));
    return `-${r}`;
  }
  if (!isFirstNegative && isSecondNegative) {
    return largePositiveNumberSubtract(num1, num2.slice(1));
  }
  return largePositiveNumberAdd(num1, num2);
}

/**
 * 大数保留 N 位小数（没有精度问题）
 * @param {String} number 大数（只能使用字符串表示）
 * @param {Number} decimalPlaces 保留的小数位数
 * @param {Boolean} largeNumber 是否为大数
 */
export function largeNumberToFixed(
  number: string | number, decimalPlaces: number = 0, largeNumber = true,
): string {
  if (!largeNumber) return Number(number).toFixed(decimalPlaces);
  if (!isString(number)) return String(number);
  const [num1, num2] = number.split('.');
  // 如果不存在小数点，则补足位数
  if (!num2) {
    return decimalPlaces ? [number, (fillZero(decimalPlaces))].join('.') : number;
  }
  // 存在小数点，保留 0 位小数，四舍五入
  if (decimalPlaces === 0) {
    return Number(num2[0]) >= 5 ? largePositiveNumberAdd(num1, '1') : num1;
  }
  // 存在小数点，保留 > 0 位小数，四舍五入（此时，整数位不会发生任何变化，只需关注小数位数）
  let decimalNumber = num2.slice(0, decimalPlaces);
  if (num2.length < decimalPlaces) {
    decimalNumber += (fillZero(decimalPlaces - num2.length));
  } else {
    decimalNumber = Number(num2[decimalPlaces]) >= 5
      ? largePositiveNumberAdd(decimalNumber, '1')
      : decimalNumber;
  }
  return [num1, decimalNumber].join('.');
}

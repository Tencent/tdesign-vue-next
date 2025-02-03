import { camelCase } from 'lodash-es';
import { isUndefined } from 'lodash-es';
import { isNull } from 'lodash-es';
import { isArray } from 'lodash-es';
import { isNumber } from 'lodash-es';
import { isString } from 'lodash-es';

export function getValidAttrs<T extends Record<string, any>>(obj: T): Partial<T> {
  const newObj: Partial<T> = {};

  Object.keys(obj).forEach((key) => {
    if (!isUndefined(obj[key]) || isNull(obj[key])) {
      newObj[key as keyof T] = obj[key];
    }
  });

  return newObj;
}

export function getTabElementByValue(tabs: [] = [], value: string): object {
  const [result] = tabs.filter((item) => {
    const { id } = item;
    return `${id}` === `${value}`;
  });
  return result || null;
}

export function firstUpperCase(str: string): string {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (char: string) => char.toUpperCase());
}

export type Gradients = { [percent: string]: string };
export type FromTo = { from: string; to: string };
export type LinearGradient = { direction?: string } & (Gradients | FromTo);
export function getBackgroundColor(color: string | string[] | LinearGradient): string {
  if (isString(color)) {
    return color;
  }
  if (isArray(color)) {
    if (color[0] && color[0][0] === '#') {
      color.unshift('90deg');
    }
    return `linear-gradient( ${color.join(',')} )`;
  }
  const { from, to, direction = 'to right', ...rest } = color;
  let keys = Object.keys(rest);
  if (keys.length) {
    keys = keys.sort((a, b) => parseFloat(a.substr(0, a.length - 1)) - parseFloat(b.substr(0, b.length - 1)));
    const tempArr = keys.map((key: any) => `${rest[key as keyof typeof rest]} ${key}`);
    return `linear-gradient(${direction}, ${tempArr.join(',')})`;
  }
  return `linear-gradient(${direction}, ${from}, ${to})`;
}

// keyboard-event => onKeyboardEvent
export function getPropsApiByEvent(eventName: string) {
  return camelCase(`on-${eventName}`);
}

/**
 * 兼容样式中支持number/string类型的传值 得出最后的结果。
 * @param param number或string类型的可用于样式上的值
 * @returns 可使用的样式值。
 */
export function pxCompat(param: string | number) {
  return isNumber(param) ? `${param}px` : param;
}

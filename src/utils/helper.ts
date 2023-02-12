import camelCase from 'lodash/camelCase';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

export function omit(obj: object, fields: string[]): object {
  const shallowCopy = {
    ...obj,
  };
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}

export function removeEmptyAttrs<T>(obj: T): Partial<T> {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (!isUndefined(obj[key]) || isNull(obj[key])) {
      newObj[key] = obj[key];
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
    const tempArr = keys.map((key: any) => `${rest[key]} ${key}`);
    return `linear-gradient(${direction}, ${tempArr.join(',')})`;
  }
  return `linear-gradient(${direction}, ${from}, ${to})`;
}

// keyboard-event => onKeyboardEvent
export function getPropsApiByEvent(eventName: string) {
  return camelCase(`on-${eventName}`);
}

/**
 * 计算字符串字符的长度并可以截取字符串。
 * @param str 传入字符串
 * @param maxCharacter 规定最大字符串长度
 * @returns 当没有传入maxCharacter时返回字符串字符长度，当传入maxCharacter时返回截取之后的字符串和长度。
 */
export function getCharacterLength(str: string, maxCharacter?: number) {
  const hasMaxCharacter = isNumber(maxCharacter);
  if (!str || str.length === 0) {
    if (hasMaxCharacter) {
      return {
        length: 0,
        characters: str,
      };
    }
    return 0;
  }
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    let currentStringLength = 0;
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      currentStringLength = 2;
    } else {
      currentStringLength = 1;
    }
    if (hasMaxCharacter && len + currentStringLength > maxCharacter) {
      return {
        length: len,
        characters: str.slice(0, i),
      };
    }
    len += currentStringLength;
  }
  if (hasMaxCharacter) {
    return {
      length: len,
      characters: str,
    };
  }
  return len;
}

/**
 * 兼容样式中支持number/string类型的传值 得出最后的结果。
 * @param param number或string类型的可用于样式上的值
 * @returns 可使用的样式值。
 */
export function pxCompat(param: string | number) {
  return isNumber(param) ? `${param}px` : param;
}

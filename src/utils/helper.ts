import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';

export function omit(obj: object, fields: string[]): object {
  const shallowCopy = {
    ...obj,
  };
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
};

export function removeEmptyAttrs<T>(obj: T): Partial<T>  {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined' || obj[key] === null) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
}

export function getTabElementByName(tabs: [] = [], name: string): object {
  const [result] = tabs.filter((item) => {
    const { id } = item as any;
    return id === name;
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
  if (typeof color === 'string') {
    return color;
  }
  if (Array.isArray(color)) {
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
  return `on${upperFirst(lowerCase(eventName))}`;
}

import { isArray } from 'lodash-es';
import { isString } from 'lodash-es';
import type { LinearGradient } from "@td/shared/interface/animation";

// ! 之前写在公共 utils 里面，但就这一个组件用上了，所以放过来了了哈暂时
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
    const tempArr = keys.map((key: string | number) => `${(rest as Record<string | number, any>)[key]} ${key}`);
    return `linear-gradient(${direction}, ${tempArr.join(',')})`;
  }

  return `linear-gradient(${direction}, ${from}, ${to})`;
}
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import { h, SetupContext, VNodeChild } from 'vue';
import { PrimaryTableCol } from '../type';

export function toString<T>(obj: T): string {
  return Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase();
}

export function debounce<T = any>(fn: Function, delay = 200): () => void {
  let timer: ReturnType<typeof setTimeout>;
  return function newFn(this: T, ...args: Array<any>): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

export function filterDataByIds<T>(
  data: Array<T> = [],
  ids: Array<string | number> = [],
  byId = 'id',
): Array<T> {
  return data.filter((d: Record<string, any> = {}) => ids.includes(d[byId]));
}

export const INNER_PRE_NAME = '@@inner-';

export enum SCROLL_DIRECTION {
  X = 'x',
  Y = 'y',
  UNKNOWN = 'unknown',
}

let preScrollLeft: any;
let preScrollTop: any;

export const getScrollDirection = (
  scrollLeft: number,
  scrollTop: number,
): SCROLL_DIRECTION => {
  let direction = SCROLL_DIRECTION.UNKNOWN;
  if (preScrollTop !== scrollTop) {
    direction = SCROLL_DIRECTION.Y;
  } else if (preScrollLeft !== scrollLeft) {
    direction = SCROLL_DIRECTION.X;
  }
  preScrollTop = scrollTop;
  preScrollLeft = scrollLeft;
  return direction;
};

// 该方法主要用于排序、过滤等需要调整表头的功能，不支持 render 函数
export function getTitle(ctx: SetupContext, column: PrimaryTableCol, colIndex: number): VNodeChild | number {
  let result = null;
  if (isFunction(column.title)) {
    result = column.title(h, { col: column, colIndex });
  } else if (ctx.slots[column.colKey]) {
    result = ctx.slots[column.colKey](null);
  } else if (isString(column.title)) {
    result = ctx.slots[column.title]
      ? ctx.slots[column.title](null)
      : column.title;
  }
  return result;
}

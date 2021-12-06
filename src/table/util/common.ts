import { h, ComponentPublicInstance, VNodeChild } from 'vue';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import { PrimaryTableCol } from '../type';

export function toString<T>(obj: T): string {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
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

export function filterDataByIds<T>(data: Array<T> = [], ids: Array<string | number> = [], byId = 'id'): Array<T> {
  return data.filter((d: Record<string, any> = {}) => ids.includes(d[byId]));
}

export const INNER_PRE_NAME = '@@inner-';

export enum ScrollDirection {
  X = 'x',
  Y = 'y',
  UNKNOWN = 'unknown',
}

let preScrollLeft: any;
let preScrollTop: any;

export const getScrollDirection = (scrollLeft: number, scrollTop: number): ScrollDirection => {
  let direction = ScrollDirection.UNKNOWN;
  if (preScrollTop !== scrollTop) {
    direction = ScrollDirection.Y;
  } else if (preScrollLeft !== scrollLeft) {
    direction = ScrollDirection.X;
  }
  preScrollTop = scrollTop;
  preScrollLeft = scrollLeft;
  return direction;
};

export const getRecord = (record: Record<any, any>) => {
  if (!record) {
    return record;
  }
  const result = {};
  Object.keys(record).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(record, key);
    descriptor &&
      Reflect.defineProperty(result, key, {
        set(val) {
          descriptor.set(val);
        },
        get() {
          console.warn('The parameter `record` will be deprecated, please use `row` instead');
          return descriptor.get();
        },
      });
  });
  return result;
};

// 该方法主要用于排序、过滤等需要调整表头的功能
export function getTitle(vm: ComponentPublicInstance, column: PrimaryTableCol, colIndex: number): VNodeChild | number {
  let result = null;
  if (isFunction(column.title)) {
    result = column.title(h, { col: column, colIndex });
  } else if (isString(column.title)) {
    result = vm.$slots[column.title] ? vm.$slots[column.title](null) : column.title;
  } else if (isFunction(column.render)) {
    result = column.render(h, {
      type: 'title',
      col: column,
      colIndex,
      row: undefined,
      rowIndex: undefined,
    });
  }
  return result;
}

export interface GetCellParams {
  row: Record<string, any>;
  rowIndex: number;
  col: PrimaryTableCol;
  colIndex: number;
}

// 该方法主要用于设置单元格（树形结构等功能会使用）
export function getCell(vm: ComponentPublicInstance, p: GetCellParams) {
  const { col, row } = p;
  let result = null;
  if (isFunction(col.cell)) {
    result = col.cell(h, { ...p });
  } else if (isString(col.cell)) {
    result = vm.$slots[col.cell] ? vm.$slots[col.cell](p) : row[col.colKey];
  } else if (isFunction(col.render)) {
    result = col.render(h, {
      type: 'cell',
      ...p,
    });
  }
  return result || row[col.colKey];
}

export function isRowSelectedDisabled(
  selectColumn: PrimaryTableCol,
  row: Record<string, any>,
  rowIndex: number,
): boolean {
  let disabled = isFunction(selectColumn.disabled) ? selectColumn.disabled({ row, rowIndex }) : selectColumn.disabled;
  if (selectColumn.checkProps) {
    if (isFunction(selectColumn.checkProps)) {
      disabled = disabled || selectColumn.checkProps({ row, rowIndex }).disabled;
    } else if (selectColumn.checkProps === 'object') {
      disabled = disabled || selectColumn.checkProps.disabled;
    }
  }
  return !!disabled;
}

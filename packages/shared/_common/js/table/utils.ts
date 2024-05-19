import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import get from 'lodash/get';
import { BaseTableCol } from './types';

export function filterDataByIds(
  data: Array<object> = [],
  ids: Array<string | number> = [],
  byId = 'id',
): Array<object> {
  return data.filter((d: Record<string, any> = {}) => ids.includes(d[byId]));
}

export enum SCROLL_DIRECTION {
  X = 'x',
  Y = 'y',
  UNKNOWN = 'unknown',
}

let preScrollLeft: any;
let preScrollTop: any;

export const getScrollDirection = (scrollLeft: number, scrollTop: number): SCROLL_DIRECTION => {
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

export function isRowSelectedDisabled(
  selectColumn: { [key: string]: any },
  row: Record<string, any>,
  rowIndex: number,
): boolean {
  if (!selectColumn) return false;
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

// 获取列属性
export function getColWidthAttr<T extends BaseTableCol<T>>(col: T, attrKey: 'width' | 'minWidth') {
  const attr = col[attrKey];
  return isNumber(attr) ? attr : parseFloat(attr);
}

export function getEditableKeysMap(keys: Array<string | number>, list: any[], rowKey: string) {
  const map: { [key: string | number]: boolean } = {};
  for (let i = 0, len = list.length; i < len; i++) {
    const rowValue = get(list[i], rowKey);
    if (keys.includes(rowValue)) {
      map[rowValue] = true;
    }
  }
  return map;
}

export function getColumnDataByKey(columns: any[], colKey: string): any {
  for (let i = 0, len = columns.length; i < len; i++) {
    if (columns[i].colKey === colKey) return columns[i];
    if (columns[i].children?.length) {
      const t = getColumnDataByKey(columns[i].children, colKey);
      if (t) return t;
    }
  }
  return null;
}

export function getColumnIndexByKey(columns: any[], colKey: string): number {
  for (let i = 0, len = columns.length; i < len; i++) {
    if (columns[i].colKey === colKey) {
      return i;
    }
    if (columns[i].children?.length) {
      const t = getColumnDataByKey(columns[i].children, colKey);
      if (t) return i;
    }
  }
  return -1;
}

export function getColumnsResetValue(columns: any[], resetValue: { [key: string]: any } = {}) {
  for (let i = 0, len = columns.length; i < len; i++) {
    const col = columns[i];
    if (col.filter && 'resetValue' in col.filter) {
      // eslint-disable-next-line no-param-reassign
      resetValue[col.colKey] = col.filter.resetValue;
    }
    if (col.children?.length) {
      getColumnsResetValue(col.children, resetValue);
    }
  }
  return resetValue;
}

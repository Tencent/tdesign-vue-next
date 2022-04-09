import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import Sortable, { SortableOptions } from 'sortablejs';
import { PrimaryTableCol, RowClassNameParams, TableRowData, TdBaseTableProps } from './type';
import { ClassName, HTMLElementAttributes } from '../common';
import { TargetDom } from './interface';

export function toString(obj: any): string {
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

export interface FormatRowAttributesParams {
  row: TableRowData;
  rowIndex: number;
  type: 'body' | 'foot';
}

// 行属性
export function formatRowAttributes(attributes: TdBaseTableProps['rowAttributes'], params: FormatRowAttributesParams) {
  if (!attributes) return undefined;
  const attrList = attributes instanceof Array ? attributes : [attributes];
  let result: HTMLElementAttributes = {};
  for (let i = 0; i < attrList.length; i++) {
    const attrItem = attrList[i];
    if (!attrItem) continue;
    const attrProperty = isFunction(attrItem) ? attrItem(params) : attrItem;
    result =
      attrProperty instanceof Array ? formatRowAttributes(attrProperty, params) : Object.assign(result, attrProperty);
  }
  return result;
}

// 行类名，['A', 'B']，[() => 'A', () => 'B']
export function formatRowClassNames(
  rowClassNames: TdBaseTableProps['rowClassName'],
  params: RowClassNameParams<TableRowData>,
  rowKey: string,
): ClassName {
  const rowClassList = rowClassNames instanceof Array ? rowClassNames : [rowClassNames];
  const { row, rowIndex } = params;
  // 自定义行类名
  let customClasses: ClassName = [];
  for (let i = 0, len = rowClassList.length; i < len; i++) {
    const rName = rowClassList[i];
    let tClass = isFunction(rName) ? rName(params) : rName;
    if (isObject(tClass) && !(tClass instanceof Array)) {
      // 根据下标设置行类名
      tClass[rowIndex] && (tClass = tClass[rowIndex]);
      // 根据行唯一标识设置行类名
      const rowId = get(row, rowKey || 'id');
      tClass[rowId] && (tClass = tClass[rowId]);
    } else if (tClass instanceof Array) {
      tClass = formatRowClassNames(tClass, params, rowKey);
    }
    customClasses = customClasses.concat(tClass);
  }
  return customClasses;
}

export function filterDataByIds(
  data: Array<object> = [],
  ids: Array<string | number> = [],
  byId = 'id',
): Array<object> {
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

// 拖拽排序api
export function setSortableConfig(target: TargetDom, options: SortableOptions) {
  if (!target) {
    return;
  }
  return new Sortable(target as any, { ...options });
}

// 多级表头，列配置场景，获取 currentRow
export function getCurrentRowByKey<T extends { colKey?: string; children?: any[] }>(columns: T[], key: string): T {
  if (!columns || !key) return;
  const col = columns?.find((t) => t.colKey === key);
  if (col) return col;
  for (let i = 0, len = columns.length; i < len; i++) {
    if (columns[i]?.children?.length) {
      return getCurrentRowByKey(columns[i]?.children, key);
    }
  }
}

import { get, isFunction, isObject } from 'lodash-es';
import type {
  CellData,
  RowClassNameParams,
  TableColumnClassName,
  TableRowData,
  TdBaseTableProps,
} from '@td/intel/components/table/type';
import type { ClassName, HTMLElementAttributes } from '@td/shared/interface';
import type { TdAffixProps as AffixProps } from '@td/intel/components/affix/type';

export function toString(obj: any): string {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

export interface FormatRowAttributesParams {
  row: TableRowData;
  rowIndex: number;
  type: 'body' | 'foot';
}

// 行属性
export function formatRowAttributes(attributes: TdBaseTableProps['rowAttributes'], params: FormatRowAttributesParams) {
  if (!attributes) {
    return undefined;
  }
  const attrList = Array.isArray(attributes) ? attributes : [attributes];
  let result: HTMLElementAttributes = {};
  for (let i = 0; i < attrList.length; i++) {
    const attrItem = attrList[i];
    if (!attrItem) {
      continue;
    }
    const attrProperty = isFunction(attrItem) ? attrItem(params) : attrItem;
    result = Array.isArray(attrProperty) ? formatRowAttributes(attrProperty, params) : Object.assign(result, attrProperty);
  }
  return result;
}

// 行类名，['A', 'B']，[() => 'A', () => 'B']
export function formatRowClassNames(
  rowClassNames: TdBaseTableProps['rowClassName'],
  params: RowClassNameParams<TableRowData>,
  rowKey: string,
): ClassName {
  const rowClassList = Array.isArray(rowClassNames) ? rowClassNames : [rowClassNames];
  const { row, rowIndex } = params;
  // 自定义行类名
  let customClasses: ClassName = [];
  for (let i = 0, len = rowClassList.length; i < len; i++) {
    const rName = rowClassList[i];
    let tClass = isFunction(rName) ? rName(params) : rName;
    if (isObject(tClass) && !(Array.isArray(tClass))) {
      // 根据下标设置行类名
      tClass[rowIndex] && (tClass = tClass[rowIndex]);
      // 根据行唯一标识设置行类名
      const rowId = get(row, rowKey || 'id');
      tClass[rowId] && (tClass = tClass[rowId]);
    } else if (Array.isArray(tClass)) {
      tClass = formatRowClassNames(tClass, params, rowKey);
    }
    customClasses = customClasses.concat(tClass);
  }
  return customClasses;
}

export function formatClassNames(
  classNames: TableColumnClassName<TableRowData> | TableColumnClassName<TableRowData>[],
  params: CellData<TableRowData>,
) {
  const classes = Array.isArray(classNames) ? classNames : [classNames];
  const arr: any[] = [];
  for (let i = 0, len = classes.length; i < len; i++) {
    const cls = classes[i];
    if (isFunction(cls)) {
      arr.push(cls(params));
    } else {
      arr.push(cls);
    }
  }
  return arr;
}

export const INNER_PRE_NAME = '@@inner-';

// 多级表头，列配置场景，获取 currentRow
export function getCurrentRowByKey<T extends { colKey?: string; children?: any[] }>(columns: T[], key: string): T {
  if (!columns || !key) {
    return;
  }
  const col = columns?.find(t => t.colKey === key);
  if (col) {
    return col;
  }
  for (let i = 0, len = columns.length; i < len; i++) {
    if (columns[i]?.children?.length) {
      return getCurrentRowByKey(columns[i]?.children, key);
    }
  }
}

/** 透传 Affix 组件全部特性 */
export function getAffixProps(mainAffixProps: boolean | AffixProps, subAffixProps?: AffixProps) {
  if (typeof mainAffixProps === 'object') {
    return mainAffixProps;
  }
  if (typeof subAffixProps === 'object') {
    return subAffixProps;
  }
  return {};
}

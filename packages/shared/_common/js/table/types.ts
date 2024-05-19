export interface BaseTableCol<T> {
  children?: T[],
  colKey?: string,
  resize?: { [attr: string]: any },
  width?: number | string,
  minWidth?: number | string,
}

export interface ThMap {
  [colKey: string]: number
}

export interface PlainObject {
  [key: string]: any;
}

export interface TableRowData {
  [key: string]: any;
  children?: TableRowData[];
}

export type PrimaryTableCol = PlainObject;

export type TableRowValue = string | number;

export interface TableRowState<T extends TableRowData = TableRowData> {
  /**
   * 表格行是否禁用选中
   * @default false
   */
  disabled?: boolean;
  /**
   * 当前节点展开的子节点数量
   */
  expandChildrenLength?: number;
  /**
   * 表格行是否展开
   * @default false
   */
  expanded: boolean;
  /**
   * 唯一标识
   */
  id: string | number;
  /**
   * 当前节点层级
   */
  level?: number;
  /**
   * 父节点
   */
  parent?: TableRowState<T>;
  /**
   * 当前节点路径
   */
  path?: TableRowState<T>[];
  /**
   * 原始表格行数据
   */
  row: T;
  /**
   * 表格行下标，值为 `-1` 标识当前行未展开显示
   */
  rowIndex: number;
}

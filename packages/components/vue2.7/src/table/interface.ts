import type { CreateElement } from '@td/adapter-vue';
import type {
  BaseTableCol,
  RowspanColspan,
  TableExpandedRowParams,
  TableRowData,
  TdBaseTableProps,
  TdEnhancedTableProps,
  TdPrimaryTableProps,
} from '@td/components/table/type';

export interface BaseTableProps extends TdBaseTableProps {
  /**
   * 渲染展开行。非公开属性，请勿在业务中使用
   */
  renderExpandedRow?: (h: CreateElement, params: TableExpandedRowParams<TableRowData>) => JSX.Element;
  /**
   * 多级表头场景，叶子结点变化时执行。非公开属性，请勿在业务中使用
   */
  onLeafColumnsChange?: (columns: BaseTableColumns) => void;
  /**
   * 表头是否可拖拽。非公开属性，请勿在业务中使用
   */
  thDraggable?: boolean;
}

export type PrimaryTableProps = TdPrimaryTableProps;
export type EnhancedTableProps = TdEnhancedTableProps;
export type TableProps = PrimaryTableProps;

export type ThRowspanAndColspan = Map<any, RowspanColspan>;

export type BaseTableColumns = TdBaseTableProps['columns'];

export interface ColumnStickyLeftAndRight {
  left: number[];
  right: number[];
  top: number[];
  bottom?: number[];
}

export interface TableColFixedClasses {
  left: string;
  right: string;
  lastLeft: string;
  firstRight: string;
  leftShadow: string;
  rightShadow: string;
}

export interface TableRowFixedClasses {
  top: string;
  bottom: string;
  firstBottom: string;
  withoutBorderBottom: string;
}

export interface FixedColumnInfo {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  parent?: FixedColumnInfo;
  children?: string[];
  width?: number;
  height?: number;
  col?: BaseTableCol;
  index?: number;
  lastLeftFixedCol?: boolean;
  firstRightFixedCol?: boolean;
}

// 固定表头和固定列 具体的固定位置（left/top/right/bottom）
export type RowAndColFixedPosition = Map<string | number, FixedColumnInfo>;

export type TableTreeExpandType = 'expand-all' | 'fold-all' | 'user-reaction-change' | 'props-change';

export interface SimplePageInfo {
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  defaultPageSize?: number;
}

import { BaseTableCol, RenderType } from '../../../types/base-table/TdBaseTableProps';
import primaryTableProps from '../../../types/primary-table/props';
import { PrimaryTableCol, SortType, TdPrimaryTableProps } from '../../../types/primary-table/TdPrimaryTableProps';
import { App } from 'vue';

export type CustomRenderName = 'title' | 'cell' | 'render';

export type CustomData = {
  type: RenderType;
  func: CustomRenderName;
};

export interface TdInstance<T> extends App {
  cellData?: {
    type: string;
    col: BaseTableCol;
    colIndex: number;
    row?: T;
    rowIndex?: number;
    customData: CustomData;
    customRender: () => void;
  };
}

export interface CellParams<T, U> {
  col: BaseTableCol;
  colIndex: number;
  row?: T;
  rowIndex?: number;
  record?: U;
}

export interface CellData<T> {
  type: string;
  col: BaseTableCol;
  colIndex: number;
  row?: T;
  rowIndex?: number;
  customData: CustomData;
  customRender: () => void;
}

export const EventNameWithUpperCase = [
  'onRowHover',
  'onRowMouseup',
  'onRowMousedown',
  'onRowClick',
  'onRowDbClick',
];
export const ExpandProps = {
  expandedRowKeys: primaryTableProps.expandedRowKeys,
  expandedRow: primaryTableProps.expandedRow,
};

export type SortColumnAndOrder = {
  sortOrder: SortType;
  sortColumn: PrimaryTableCol;
};

export type RenderExpandRowParams = {
  row: any;
  rows: any;
  rowIndex: number;
  columns: TdPrimaryTableProps['columns'];
}

import primaryTableProps from '../primary-table-props';
import { BaseTableCol, RenderType, PrimaryTableCol, SortType, TdPrimaryTableProps } from '../type';
import { App } from 'vue';

export type CustomRenderName = 'title' | 'cell' | 'render';

export type CustomData = {
  type: RenderType;
  func: CustomRenderName;
};

export interface TdInstance extends App {
  cellData?: {
    type: string;
    col: BaseTableCol;
    colIndex: number;
    row?: Record<string, any>;
    rowIndex?: number;
    customData: CustomData;
    customRender: () => void;
  };
}

export interface CellParams {
  col: BaseTableCol;
  colIndex: number;
  row?: Record<string, any>;
  rowIndex?: number;
  record?: Record<string, any>;
}

export interface CellData {
  type: string;
  col: BaseTableCol;
  colIndex: number;
  row?: Record<string, any>;
  rowIndex?: number;
  customData: CustomData;
  customRender: () => void;
}

export const EVENT_NAME_WIDTH_UPPER_CASE = [
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
};

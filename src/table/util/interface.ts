import { BaseTableCol, RenderType } from '../../../types/base-table/TdBaseTableProps';
import primaryTableProps from '../../../types/primary-table/props';
import { PrimaryTableCol, SortType, TdPrimaryTableProps } from '../../../types/primary-table/TdPrimaryTableProps';

export type CustomRenderName = 'title' | 'cell' | 'render';

export type CustomData = {
  type: RenderType;
  func: CustomRenderName;
};

export interface TdInstance extends Vue {
  cellData?: {
    type: string;
    col: BaseTableCol;
    colIndex: number;
    row?: object;
    rowIndex?: number;
    customData: CustomData;
    customRender: Function;
  };
};

export interface CellParams {
  col: BaseTableCol;
  colIndex: number;
  row?: object;
  rowIndex?: number;
  record?: object;
};
export interface CellData {
  type: string;
  col: BaseTableCol;
  colIndex: number;
  row?: object;
  rowIndex?: number;
  customData: CustomData;
  customRender: Function;
};

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

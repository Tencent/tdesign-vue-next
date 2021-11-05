import { ComponentPublicInstance } from 'vue';
import primaryTableProps from '../primary-table-props';
import {
  BaseTableCol, RenderType, TdPrimaryTableProps,
} from '../type';

export type CustomRenderName = 'title' | 'cell' | 'render';

export type CustomData = {
  type: RenderType;
  func: CustomRenderName;
};

export interface TdInstance extends ComponentPublicInstance {
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

export const EVENT_NAME_WITH_KEBAB = [
  'row-hover',
  'row-mouseenter',
  'row-mouseleave',
  'row-mouseup',
  'row-mousedown',
  'row-click',
  'row-db-click',
  'row-dragstart',
  'row-dragover',
];

export const ExpandProps = {
  expandedRowKeys: primaryTableProps.expandedRowKeys,
  expandedRow: primaryTableProps.expandedRow,
};

export type RenderExpandRow = {
  row: any;
  rows: any;
  rowIndex: number;
  columns: TdPrimaryTableProps['columns'];
};

import { TNodeReturnValue } from '../common';
import {
  TdBaseTableProps,
  TableExpandedRowParams,
  TableRowData,
  TdPrimaryTableProps,
  TdEnhancedTableProps,
} from './type';

export interface BaseTableProps extends TdBaseTableProps {
  /**
   * 渲染展开行，非公开属性，请勿在业务中使用
   */
  renderExpandedRow: (params: TableExpandedRowParams<TableRowData>) => TNodeReturnValue;
}

export type PrimaryTableProps = TdPrimaryTableProps;
export type EnhancedTableProps = TdEnhancedTableProps;
export type TableProps = PrimaryTableProps;
export type TargetDom = HTMLElement | Element | null;

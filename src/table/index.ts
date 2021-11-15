import cloneDeep from 'lodash/cloneDeep';
import { prefix } from '../config';
import _BaseTable from './base-table/index';
import _PrimaryTable from './primary-table/index';
import _EnhancedTable from './enhanced-table/index';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdBaseTableProps, TdPrimaryTableProps } from './type';

import './style';

export * from './type';
export type BaseTableProps = TdBaseTableProps;
export type PrimaryTableProps = TdPrimaryTableProps;

const TPrimaryTable = mapProps([
  {
    name: 'expandedRowKeys',
    event: 'expand-change',
  },
  {
    name: 'selectedRowKeys',
    event: ['select-change', 'update:selectedRowKeys'],
  },
  {
    name: 'sort',
    event: ['sort-change', 'update:sort'],
  },
  {
    name: 'filterValue',
    event: ['filter-change', 'update:filterValue'],
  },
])(_PrimaryTable);

export const BaseTable: WithInstallType<typeof _BaseTable> = withInstall(_BaseTable);
export const PrimaryTable: WithInstallType<typeof TPrimaryTable> = withInstall(TPrimaryTable);
export const EnhancedTable = withInstall(_EnhancedTable);

const LocalBaseTable = cloneDeep(TPrimaryTable);
LocalBaseTable.name = `${prefix}-table`;
export const Table: WithInstallType<typeof LocalBaseTable> = withInstall(LocalBaseTable);

export default Table;

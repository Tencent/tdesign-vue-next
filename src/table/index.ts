import _BaseTable from './base-table/index';
import _PrimaryTable from './primary-table/index';
import mapProps from '../utils/map-props';
import withInstall from '../utils/withInstall';
import { prefix } from '../config';


const TPrimaryTable = mapProps([
  {
    name: 'expandedRowKeys',
    event: ['expand-change', 'update:expandedRowKeys'],
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


export const BaseTable = withInstall(_BaseTable);
export const PrimaryTable = withInstall(TPrimaryTable);
TPrimaryTable.name = `${prefix}-table`;
export const Table = withInstall(PrimaryTable);

export default Table;

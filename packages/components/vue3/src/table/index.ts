import cloneDeep from 'lodash/cloneDeep';
import _BaseTable from './base-table';
import _PrimaryTable from './primary-table';
import _EnhancedTable from './enhanced-table';
import withInstall from '../utils/withInstall';
import { InfinityScroll } from '../common';
import { BaseTableInstanceFunctions, EnhancedTableInstanceFunctions, PrimaryTableInstanceFunctions } from '@td/intel/../../vue3/src/table/type';

import './style';

export * from '@td/intel/../../vue3/src/table/type';
export * from './interface';

export type AllTableInstanceFunctions = EnhancedTableInstanceFunctions &
  PrimaryTableInstanceFunctions &
  BaseTableInstanceFunctions;

export type TableScroll = InfinityScroll;
export const BaseTable = withInstall(_BaseTable);
export const PrimaryTable = withInstall(_PrimaryTable);
export const EnhancedTable = withInstall(_EnhancedTable);

const table = cloneDeep(_PrimaryTable);
export const Table = withInstall(table, 'TTable');

export default Table;

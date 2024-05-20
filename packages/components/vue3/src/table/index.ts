import { cloneDeep } from 'lodash-es';
import { withInstall } from '@td/adapter-utils';
import type { BaseTableInstanceFunctions, EnhancedTableInstanceFunctions, PrimaryTableInstanceFunctions } from '@td/intel/table/type';
import type { InfinityScroll } from '@td/shared/interface';
import _BaseTable from './base-table';
import _PrimaryTable from './primary-table';
import _EnhancedTable from './enhanced-table';

import './style';

export * from '@td/intel/table/type';
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

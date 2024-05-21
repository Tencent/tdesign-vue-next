import { withInstall } from '@td/adapter-utils';
import _BaseTable from './base-table';
import _PrimaryTable from './primary-table';
import _EnhancedTable from './enhanced-table';

import './style';

export * from '@td/intel/table/type';
export * from './interface';

export const BaseTable = withInstall(_BaseTable);
export const PrimaryTable = withInstall(_PrimaryTable);
export const EnhancedTable = withInstall(_EnhancedTable);
export const Table = withInstall({ ..._PrimaryTable, name: 'TTable' });

export default Table;

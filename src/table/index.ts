import cloneDeep from 'lodash/cloneDeep';
import _BaseTable from './base-table';
import _PrimaryTable from './primary-table';
import _EnhancedTable from './enhanced-table';
import { withInstall, WithInstallType } from '../utils/withInstall';

import './style';

export * from './type';
export * from './interface';

export const BaseTable: WithInstallType<typeof _BaseTable> = withInstall(_BaseTable);
export const PrimaryTable: WithInstallType<typeof _PrimaryTable> = withInstall(_PrimaryTable);
export const EnhancedTable: WithInstallType<typeof _EnhancedTable> = withInstall(_EnhancedTable);

const table = cloneDeep(_PrimaryTable);
table.name = 'TTable';
export const Table: WithInstallType<typeof _PrimaryTable> = withInstall(table);

export default Table;

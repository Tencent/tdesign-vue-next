import { cloneDeep } from 'lodash-es';
import _BaseTable from './base-table';
import _PrimaryTable from './primary-table';
import _EnhancedTable from './enhanced-table';
import { withInstall } from '@tdesign/shared-utils';
import { InfinityScroll } from '../common';
import { BaseTableInstanceFunctions, EnhancedTableInstanceFunctions, PrimaryTableInstanceFunctions } from './type';

import './style';

export * from './type';
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

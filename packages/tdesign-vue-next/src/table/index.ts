import { cloneDeep } from 'lodash-es';
import { withInstall } from '@td/adapter-vue';
import type { BaseTableInstanceFunctions, EnhancedTableInstanceFunctions, PrimaryTableInstanceFunctions } from '@td/components/table/type';
import type { InfinityScroll } from '@td/types';
import _BaseTable from '@td/components-vue3/src/table/base-table';
import _PrimaryTable from '@td/components-vue3/src/table/primary-table';
import _EnhancedTable from '@td/components-vue3/src/table/enhanced-table';

import '@td/components-vue3/src/table/style';

export * from '@td/components/table/type';
export * from '@td/components-vue3/src/table/interface';

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

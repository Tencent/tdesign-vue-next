import { withInstall } from '@td/adapter-vue';
import _Pagination from '@td/components-common/src/pagination/pagination';
import _PaginationMini from '@td/components-common/src/pagination/pagination-mini';
import type { TdPaginationMiniProps, TdPaginationProps } from './type';

import '@td/components-common/src/pagination/style';

export * from './type';
export type PaginationProps = TdPaginationProps;
export type PaginationMiniProps = TdPaginationMiniProps;

export const Pagination = withInstall(_Pagination);
export const PaginationMini = withInstall(_PaginationMini);

export default Pagination;

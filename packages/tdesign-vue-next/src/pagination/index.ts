import { withInstall } from '@td/adapter-vue';
import type { TdPaginationMiniProps, TdPaginationProps } from '@td/components/pagination/type';
import _Pagination from '@td/components-common/src/pagination/pagination';
import _PaginationMini from '@td/components-common/src/pagination/pagination-mini';

import '@td/components-common/src/pagination/style';

export * from '@td/components/pagination/type';
export type PaginationProps = TdPaginationProps;
export type PaginationMiniProps = TdPaginationMiniProps;

export const Pagination = withInstall(_Pagination);
export const PaginationMini = withInstall(_PaginationMini);

export default Pagination;

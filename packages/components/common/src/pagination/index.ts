import { withInstall } from '@td/adapter-vue';
import type { TdPaginationMiniProps, TdPaginationProps } from '@td/components/pagination/type';
import _Pagination from './pagination';
import _PaginationMini from './pagination-mini';

import './style';

export * from '@td/components/pagination/type';
export type PaginationProps = TdPaginationProps;
export type PaginationMiniProps = TdPaginationMiniProps;

export const Pagination = withInstall(_Pagination);
export const PaginationMini = withInstall(_PaginationMini);

export default Pagination;

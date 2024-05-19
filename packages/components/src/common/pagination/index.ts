import { withInstall } from '@td/adapter-utils';
import type { TdPaginationMiniProps, TdPaginationProps } from '@td/intel/components/pagination/type';
import _Pagination from './pagination';
import _PaginationMini from './pagination-mini';

import './style';

export * from '@td/intel/components/pagination/type';
export type PaginationProps = TdPaginationProps;
export type PaginationMiniProps = TdPaginationMiniProps;

export const Pagination = withInstall(_Pagination);
export const PaginationMini = withInstall(_PaginationMini);

export default Pagination;

import _Pagination from './pagination';
import _PaginationMini from './pagination-mini';
import withInstall from '../utils/withInstall';
import { TdPaginationProps, TdPaginationMiniProps } from '@td/intel/pagination/type';

import './style';

export * from '@td/intel/pagination/type';
export type PaginationProps = TdPaginationProps;
export type PaginationMiniProps = TdPaginationMiniProps;

export const Pagination = withInstall(_Pagination);
export const PaginationMini = withInstall(_PaginationMini);

export default Pagination;

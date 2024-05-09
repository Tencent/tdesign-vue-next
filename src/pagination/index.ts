import withInstall from '../utils/withInstall';

import _Pagination from './pagination';
import _PaginationMini from './pagination-mini';
import { TdPaginationProps, TdPaginationMiniProps } from './type';

import './style';

export * from './type';
export type PaginationProps = TdPaginationProps;
export type PaginationMiniProps = TdPaginationMiniProps;

export const Pagination = withInstall(_Pagination);
export const PaginationMini = withInstall(_PaginationMini);

export default Pagination;

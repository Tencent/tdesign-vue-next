import _Jumper from './jumper';
import _Pagination from './pagination';
import withInstall from '../utils/withInstall';
import { TdPaginationProps } from './type';

import './style';

export * from './type';
export type PaginationProps = TdPaginationProps;

export const Jumper = withInstall(_Jumper);
export const Pagination = withInstall(_Pagination);
export default Pagination;

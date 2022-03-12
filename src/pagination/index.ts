import _Pagination from './pagination';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdPaginationProps } from './type';

import './style';

export * from './type';
export type PaginationProps = TdPaginationProps;

export const Pagination: WithInstallType<typeof _Pagination> = withInstall(_Pagination);
export default Pagination;

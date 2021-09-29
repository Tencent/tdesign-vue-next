import _Pagination from './pagination';
import { withInstall, WithInstallType } from '../utils/withInstall';
import mapProps from '../utils/map-props';
import { TdPaginationProps } from './type';

import './style';

export * from './type';
export type PaginationProps = TdPaginationProps;

export const Pagination: WithInstallType<typeof _Pagination> = withInstall(mapProps([
  {
    name: 'current',
    alias: ['modelValue'],
    event: 'current-change',
  },
  {
    name: 'pageSize',
    event: 'page-size-change',
  },
])(_Pagination));
export default Pagination;

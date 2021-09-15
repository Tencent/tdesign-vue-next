import _Pagination from './pagination';
import { withInstall, WithInstallType } from '../utils/withInstall';
import mapProps from '../utils/map-props';
import { TdPaginationProps } from './type';

// 支持非受控属性 defaultCurrent 和 defaultSize
const LocalPagination = mapProps([
  {
    name: 'current',
    alias: ['modelValue'],
    event: 'current-change',
  },
  {
    name: 'pageSize',
    event: 'page-size-change',
  },
])(_Pagination);

export type PaginationProps = TdPaginationProps;
export * from './type';

export const Pagination: WithInstallType<typeof LocalPagination> = withInstall(LocalPagination);
export default Pagination;

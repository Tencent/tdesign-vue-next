import _Pagination from './pagination';
import { withInstall, WithInstallType } from '../utils/withInstall';
import mapProps from '../utils/map-props';
import { TdPaginationProps } from '@TdTypes/pagination/TdPaginationProps';

// 支持非受控属性 defaultCurrent 和 defaultSize
const localPagination = mapProps([
  {
    name: 'value',
    alias: ['current'],
    event: 'change',
  },
  {
    name: 'pageSize',
  },
])(_Pagination);

const Pagination: WithInstallType<typeof localPagination> = withInstall(localPagination);

export type PaginationProps = TdPaginationProps;

export * from '@TdTypes/pagination/TdPaginationProps';
export { Pagination };
export default Pagination;

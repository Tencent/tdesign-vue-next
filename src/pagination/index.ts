import _Pagination from './pagination';
import setInstallFn from '../utils/setInstallFn';
import mapProps from '../utils/map-props';
import { TdPaginationProps } from '@TdTypes/pagination/TdPaginationProps';

// 支持非受控属性 defaultCurrent 和 defaultSize
const Pagination = mapProps([
  {
    name: 'value',
    alias: ['current'],
    event: 'change',
  },
  {
    name: 'pageSize',
  },
])(_Pagination);

setInstallFn('Pagination', Pagination);

export type PaginationProps = TdPaginationProps;

export * from '@TdTypes/pagination/TdPaginationProps';
export { Pagination };
export default Pagination;

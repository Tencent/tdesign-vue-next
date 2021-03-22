import _Pagination from './pagination.vue';
import setInstallFn from '../utils/setInstallFn';
import mapProps from '../utils/map-props';
import { TdPaginationProps } from '@TdTypes/pagination/TdPaginationProps';

// 支持非受控属性 defaultCurrent 和 defaultSize
const Pagination = mapProps(
  ['current', 'pageSize'],
  { model: { prop: 'current', event: 'change' } },
)(_Pagination);

setInstallFn('Pagination', Pagination);

export type PaginationProps = TdPaginationProps;

export * from '@TdTypes/pagination/TdPaginationProps';
export { Pagination };
export default Pagination;

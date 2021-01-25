import Pagination from './pagination.vue';
import setInstallFn from '../utils/setInstallFn';
import { TdPaginationProps } from '@TdTypes/pagination/TdPaginationProps';

setInstallFn('Pagination', Pagination);

export type PaginationProps = TdPaginationProps;

export * from '@TdTypes/pagination/TdPaginationProps';
export { Pagination };
export default Pagination;

import type {
  CreateElement,
  Ref,
  SetupContext,
} from '@td/adapter-vue';
import { computed, ref, toRefs, watch } from '@td/adapter-vue';
import log from '@td/common/js/log';
import { useConfig } from '@td/adapter-hooks';
import type { TableRowData, TdBaseTableProps } from '@td/intel/table/type';
import type { PageInfo, TdPaginationProps as PaginationProps } from '@td/intel/pagination/type';
import Pagination from '@td/component';

const DEFAULT_PAGE_SIZE = 10;

export function usePaginationValue(
  pagination: Ref<PaginationProps>,
  onPageChange: TdBaseTableProps['onPageChange'],
): [Ref<PaginationProps>, Ref<TdBaseTableProps['onPageChange']>] {
  if (
    (pagination.value?.current && pagination.value?.defaultPageSize)
    || (pagination.value?.defaultCurrent && pagination?.value.pageSize)
  ) {
    log.error(
      'Table',
      'cannot set both current and defaultPageSize, or defaultCurrent and pagesize. current/pageSize and defaultCurrent/defaultPageSize are allowed.',
    );
  }

  const innerPagination = ref<PaginationProps>();
  const setInnerPagination = ref(onPageChange);

  // switch value of pagination from undefined to truthy value
  watch(
    () => ({ ...pagination.value }),
    (pagination) => {
      if (!pagination) {
        return [innerPagination, setInnerPagination];
      }
      const isControlled = Boolean(pagination?.current);
      if (isControlled) {
        innerPagination.value = pagination;
        return;
      }

      if (!innerPagination.value && pagination.defaultCurrent) {
        innerPagination.value = {
          ...pagination,
          current: pagination.defaultCurrent,
          pageSize: pagination.defaultPageSize || DEFAULT_PAGE_SIZE,
        };
      } else if (innerPagination.value && !pagination.defaultCurrent) {
        innerPagination.value = undefined;
      }

      setInnerPagination.value = (newPagination: PageInfo, newData: TableRowData[]) => {
        innerPagination.value = { ...innerPagination.value, ...newPagination };
        onPageChange?.(newPagination, newData);
      };
    },
    { immediate: true },
  );

  return [innerPagination, setInnerPagination];
}

export default function usePagination(props: TdBaseTableProps, context: SetupContext) {
  const { pagination, disableDataPage, data } = toRefs(props);
  const { classPrefix } = useConfig();
  const dataSource = ref<TableRowData[]>([]);

  const onPageChange = (pageInfo: PageInfo, newData: TableRowData[]) => {
    // Vue3 ignore this line
    context.emit('page-change', pageInfo, newData);
    props.onPageChange?.(pageInfo, newData);
  };

  const [innerPagination, setInnerPagination] = usePaginationValue(pagination, onPageChange);

  // data 数据数量超出分页大小时，则自动启动本地数据分页
  const isPaginateData = computed(() => {
    const pageSize = innerPagination?.value?.pageSize || DEFAULT_PAGE_SIZE;
    return Boolean(!disableDataPage.value && props.data.length > pageSize);
  });

  const getDataSourceAndPaginate = (current = 1, pageSize = DEFAULT_PAGE_SIZE) => {
    const { data } = props;
    let paginationData = [];
    if (isPaginateData.value) {
      const start = (current - 1) * pageSize;
      const end = current * pageSize;
      paginationData = data.slice(start, end);
    } else {
      paginationData = data;
    }
    return paginationData;
  };

  watch(
    () => [{ ...innerPagination.value }, [...data.value]],
    ([innerPagination, data]: [PaginationProps, TableRowData[]]) => {
      if (!innerPagination?.current) {
        dataSource.value = data;
        return;
      }
      const { current, pageSize } = innerPagination;
      dataSource.value = getDataSourceAndPaginate(current, pageSize);
    },
    { immediate: true },
  );

  // eslint-disable-next-line
  const renderPagination = (h: CreateElement) => {
    if (!innerPagination.value) {
      return null;
    }
    return (
      <div class={`${classPrefix.value}-table__pagination`}>
        <Pagination
          props={{ ...props.pagination, ...innerPagination.value }}
          on={{
            change: (pageInfo: PageInfo) => {
              const dataSource = getDataSourceAndPaginate(pageInfo.current, pageInfo.pageSize);
              setInnerPagination?.value?.({ ...innerPagination.value, ...pageInfo }, dataSource);
            },
          }}
          scopedSlots={{ totalContent: context.slots.totalContent }}
        />
      </div>
    );
  };

  return {
    isPaginateData,
    dataSource,
    innerPagination,
    renderPagination,
  };
}

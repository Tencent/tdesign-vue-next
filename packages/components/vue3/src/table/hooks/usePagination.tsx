import type { SetupContext } from '@td/adapter-vue';
import { ref, toRefs, watch } from '@td/adapter-vue';
import { useConfig } from '../../hooks/useConfig';
import type { PageInfo, PaginationProps } from '../../pagination';
import Pagination from '../../pagination';
import type { TableRowData, TdBaseTableProps } from '../type';

// 分页功能包含：远程数据排序受控、远程数据排序非受控、本地数据排序受控、本地数据排序非受控 等 4 类功能
export default function usePagination(props: TdBaseTableProps, context: SetupContext) {
  const { pagination, data, disableDataPage } = toRefs(props);
  const { classPrefix } = useConfig();
  const innerPagination = ref<PaginationProps>(props.pagination);

  const dataSource = ref<TableRowData[]>([]);
  const isPaginateData = ref(false);

  const updateDataSourceAndPaginate = (current = 1, pageSize = 10) => {
    const { data } = props;
    // data 数据数量超出分页大小时，则自动启动本地数据分页
    const t = Boolean(!disableDataPage.value && data.length > pageSize);
    isPaginateData.value = t;
    if (t) {
      const start = (current - 1) * pageSize;
      const end = current * pageSize;
      dataSource.value = data.slice(start, end);
    } else {
      dataSource.value = data;
    }
  };

  // 受控情况，只有 pagination.current 或者 pagination.pageSize 变化，才对数据进行排序
  watch(
    () => [pagination.value?.current, pagination.value?.pageSize, data.value.length, disableDataPage],
    () => {
      if (!pagination.value || !pagination.value.current) {
        return;
      }
      const { current, pageSize } = pagination.value;
      innerPagination.value = { current, pageSize };
      updateDataSourceAndPaginate(pagination.value.current, pagination.value.pageSize);
    },
    { immediate: true },
  );

  // 非受控情况，只执行一次 Props 数据更新（pagination.defaultCurrent 和 pagination.defaultPageSize）
  watch(
    [data],
    () => {
      if (!pagination.value || !pagination.value.defaultCurrent) {
        return;
      }
      const isControlled = Boolean(pagination.value.current);
      // 存在受控属性时，立即返回不再执行后续内容
      if (isControlled) {
        return;
      }
      updateDataSourceAndPaginate(
        innerPagination.value.current ?? pagination.value.defaultCurrent,
        innerPagination.value.pageSize ?? pagination.value.defaultPageSize,
      );
    },
    { immediate: true },
  );

  const renderPagination = () => {
    if (!props.pagination) {
      return null;
    }
    const paginationProps = { ...props.pagination };
    // Vue3，两个 onChange 事件绑定，会成为数组，因为需提前移除外部 onChange
    delete paginationProps.onChange;
    return (
      <div class={`${classPrefix.value}-table__pagination`}>
        <Pagination
          {...paginationProps}
          onChange={(pageInfo: PageInfo) => {
            props.pagination?.onChange?.(pageInfo);
            innerPagination.value = pageInfo;
            updateDataSourceAndPaginate(pageInfo.current, pageInfo.pageSize);
            props.onPageChange?.(pageInfo, dataSource.value);
          }}
          v-slots={{ totalContent: context.slots.totalContent }}
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

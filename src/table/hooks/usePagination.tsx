import { computed, ref, SetupContext, toRefs, watch } from 'vue';
import { useConfig } from '../../config-provider/useConfig';
import Pagination, { PageInfo } from '../../pagination';
import { TdBaseTableProps } from '../type';

export default function usePagination(props: TdBaseTableProps, context: SetupContext) {
  const { pagination } = toRefs(props);
  const { classPrefix } = useConfig();

  const current = ref<number>(pagination.value?.current || pagination.value?.defaultCurrent);
  const pageSize = ref<number>(pagination.value?.pageSize || pagination.value?.defaultPageSize);

  watch([pagination], ([val]) => {
    current.value = val.current;
    pageSize.value = val.pageSize;
  });

  // 是否开启本地数据分页
  const isPaginateData = computed(() =>
    Boolean(!props.disableDataPage && pagination && props.data.length > pageSize.value),
  );

  const dataSource = computed(() => {
    // data 数据数量超出分页大小时，则自动启动数据分页
    if (isPaginateData.value) {
      const start = (current.value - 1) * pageSize.value;
      const end = current.value * pageSize.value;
      return props.data.slice(start, end);
    }
    return props.data;
  });

  const renderPagination = () => {
    if (!props.pagination) return null;
    return (
      <div class={`${classPrefix.value}-table__pagination`}>
        <Pagination
          onChange={(pageInfo: PageInfo) => {
            current.value = pageInfo.current;
            pageSize.value = pageInfo.pageSize;
            props.onPageChange?.(pageInfo, dataSource.value);
          }}
          {...props.pagination}
        />
      </div>
    );
  };

  return {
    isPaginateData,
    dataSource,
    renderPagination,
  };
}

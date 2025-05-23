<template>
  <t-table
    :data="data"
    :columns="columns"
    :row-key="rowKey"
    :loading="isLoading"
    :pagination="pagination"
    :selected-row-keys="selectedRowKeys"
    :reserve-selected-row-on-paginate="false"
    bordered
    stripe
    lazy-load
    @change="rehandleChange"
    @page-change="onPageChange"
    @select-change="onSelectChange"
  />
</template>
<script setup lang="jsx">
import { ref, onMounted } from 'vue';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';

const statusNameListMap = {
  0: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
  1: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
  2: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
};
const columns = [
  {
    colKey: 'serial-number',
  },
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'name',
    title: '姓名',
    render(h, { type, row: { name } }) {
      if (type === 'title') return '申请人';
      return name ? `${name.first} ${name.last}` : 'UNKNOWN_USER';
    },
  },
  {
    colKey: 'status',
    title: '申请状态',
    // eslint-disable-next-line
    cell: (h, { row, rowIndex }) => {
      const status = rowIndex % 3;
      return (
        <t-tag shape="round" theme={statusNameListMap[status].theme} variant="light-outline">
          {statusNameListMap[status].icon}
          {statusNameListMap[status].label}
        </t-tag>
      );
    },
  },
  {
    colKey: 'phone',
    title: '联系方式',
    render(h, { row: { phone } }) {
      return phone;
    },
  },
  {
    colKey: 'email',
    title: '邮箱',
    ellipsis: true,
  },
];

const data = ref([]);
const isLoading = ref(false);
const selectedRowKeys = ref([]);

const pagination = ref({
  defaultPageSize: 20,
  total: 100,
  defaultCurrent: 1,
});

const fetchData = async (paginationInfo) => {
  try {
    isLoading.value = true;
    const { current, pageSize } = paginationInfo;
    // 请求可能存在跨域问题
    const response = await fetch(`https://randomuser.me/api?page=${current}&results=${pageSize}`);
    const { results } = await response.json();
    data.value = results;
    // 数据加载完成，设置数据总条数
    pagination.value.total = 120;
  } catch (err) {
    console.log(err);
    data.value = [];
  }
  isLoading.value = false;
};

// BaseTable 中只有 page-change 事件，没有 change 事件
const rehandleChange = (changeParams, triggerAndData) => {
  console.log('分页、排序、过滤等发生变化时会触发 change 事件：', changeParams, triggerAndData);
};

// BaseTable 中只有 page-change 事件，没有 change 事件
const onPageChange = async (pageInfo) => {
  console.log('page-change', pageInfo);
  // 下面为受控方式，如果使用此方式，将pagination内的defaultCurrent改为current
  // pagination.value.current = pageInfo.current;
  // pagination.value.pageSize = pageInfo.pageSize;
  await fetchData(pageInfo);
};

onMounted(async () => {
  await fetchData({
    current: pagination.value.current || pagination.value.defaultCurrent,
    pageSize: pagination.value.pageSize || pagination.value.defaultPageSize,
  });
});

const onSelectChange = (value, params) => {
  selectedRowKeys.value = value;
  console.log(value, params);
};

const rowKey = 'phone';
</script>

<template>
  <div class="tdesign-demo-block-column-large demo-container">
    <div>
      <t-checkbox v-model="hideSortTips"> 隐藏排序文本提示 </t-checkbox>
      <span style="padding-left: 16px; vertical-align: top">排序：{{ sort }}</span>
    </div>

    <!-- 非受控用法：不需要传 sort，或者只需要传 defaultSort: { sortBy: 'status', descending: true }），defaultSort 仅第一次有效 -->
    <!-- 非受控用法，示例代码有效，勿删 -->
    <!-- <t-table rowKey="id" :columns="columns" :data="data" @sort-change="defaultSortChange">
      <template #status="{ row }">
        <p v-if="row.status === 0" class="status">健康</p>
        <p v-if="row.status === 1" class="status warning">警告</p>
        <p v-if="row.status === 2" class="status unhealth">异常</p>
      </template>
    </t-table> -->

    <!-- 受控用法，示例代码有效，勿删 -->
    <t-table
      row-key="index"
      :columns="columns"
      :data="data"
      :sort="sort"
      :hide-sort-tips="hideSortTips"
      :show-sort-column-bg-color="true"
      bordered
      lazy-load
      @sort-change="sortChange"
      @change="onChange"
    >
    </t-table>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { TableProps } from 'tdesign-vue-next';
import { CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
const statusNameListMap = {
  0: {
    label: '审批通过',
    theme: 'success',
    icon: <CheckCircleFilledIcon />,
  },
  1: {
    label: '审批失败',
    theme: 'danger',
    icon: <CloseCircleFilledIcon />,
  },
  2: {
    label: '审批过期',
    theme: 'warning',
    icon: <ErrorCircleFilledIcon />,
  },
};
const columns = ref<TableProps['columns']>([
  {
    colKey: 'applicant',
    title: '申请人',
    width: '100',
  },
  {
    colKey: 'status',
    title: '申请状态',
    width: '150',
    sortType: 'all',
    sorter: true,
    cell: (h, { row }) => {
      return (
        <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
          {statusNameListMap[row.status].icon}
          {statusNameListMap[row.status].label}
        </t-tag>
      );
    },
  },
  {
    colKey: 'time',
    title: '申请耗时(天)',
    width: '140',
    align: 'center',
    sortType: 'all',
    sorter: true,
  },
  {
    colKey: 'channel',
    title: '签署方式',
    width: '120',
  },
  {
    colKey: 'createTime',
    title: '申请时间',
  },
]);
const initialData = new Array(4).fill(null).map((_, i) => ({
  index: i + 1,
  applicant: ['贾明', '张三', '王芳'][i % 3],
  status: i % 3,
  channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
  detail: {
    email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
  },
  matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
  time: [2, 3, 1, 4][i % 4],
  createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
}));
const sort = ref<TableProps['sort']>({
  sortBy: 'status',
  descending: true,
});
const data = ref<TableProps['data']>([...initialData]);
const hideSortTips = ref(false);
const request = (sort: TableProps['sort']) => {
  // 模拟异步请求，进行数据排序
  if (Array.isArray(sort)) return;
  const timer = setTimeout(() => {
    if (sort) {
      data.value = data.value
        .concat()
        .sort((a, b) => (sort.descending ? b[sort.sortBy] - a[sort.sortBy] : a[sort.sortBy] - b[sort.sortBy]));
    } else {
      data.value = data.value.concat();
    }
    clearTimeout(timer);
  }, 100);
};
const sortChange: TableProps['onSortChange'] = (val) => {
  sort.value = val;
  request(val);
};

// 排序、分页、过滤等发生变化时会触发 change 事件
const onChange: TableProps['onChange'] = (info, context) => {
  console.log('change', info, context);
};

// 非受控用法，不需要传递 sort 给 Table 组件，因而此处无需执行 this.sort = sort 进行赋值
// const defaultSortChange = (sort) => {
//   this.request(sort);
// };
</script>

<style lang="less">
:deep([class*='t-table-expandable-icon-cell']) .t-icon {
  background-color: transparent;
}
</style>

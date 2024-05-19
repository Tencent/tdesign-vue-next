<template>
  <div class="demo-container t-table-demo-sort">
    <div class="item">
      <!-- 拖拽排序涉及到 data 的变更，相对比较慎重，因此仅支持受控用法 -->

      <t-table
        row-key="index"
        :columns="columns"
        :data="data"
        drag-sort="row"
        :pagination="pagination"
        lazy-load
        @drag-sort="onDragSort"
      ></t-table>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { TableProps } from 'tdesign-vue-next';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
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
function getData(total = 500) {
  const initialData: TableProps['data'] = [];
  for (let i = 0; i < total; i++) {
    initialData.push({
      index: i + 1,
      applicant: `${['贾明', '张三', '王芳'][i % 3]}${i + 1}`,
      status: i % 3,
      channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
      detail: {
        email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
      },
      matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
      time: [2, 3, 1, 4][i % 4],
      createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
    });
  }
  return initialData;
}
const data = ref<TableProps['data']>(getData());

// 受控用法
const pagination = ref<TableProps['pagination']>({
  current: 2,
  pageSize: 5,
  total: 500,
  onChange: (pageInfo) => {
    pagination.value.current = pageInfo.current;
    pagination.value.pageSize = pageInfo.pageSize;
  },
});

// 非受控用法
// const pagination1 = ref({
//   defaultCurrent: 1,
//   defaultPageSize: 5,
//   total: 500,
// })

const columns: TableProps['columns'] = [
  {
    colKey: 'applicant',
    title: '申请人',
    width: '100',
  },
  {
    colKey: 'status',
    title: '申请状态',
    width: '150',
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
    colKey: 'channel',
    title: '签署方式',
    width: '120',
  },
  {
    colKey: 'detail.email',
    title: '邮箱地址',
    ellipsis: true,
  },
  {
    colKey: 'createTime',
    title: '申请时间',
  },
];

// { currentIndex, targetIndex, current, target, data, newData, e }
const onDragSort: TableProps['onDragSort'] = (params) => {
  console.log('交换行', params);
  data.value = params.newData;
};
</script>

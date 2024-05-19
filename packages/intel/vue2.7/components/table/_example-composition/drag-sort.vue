<template>
  <div class="demo-container t-table-demo-sort tdesign-demo__table">
    <div class="item">
      <!-- 拖拽排序涉及到 data 的变更，相对比较慎重，因此仅支持受控用法 -->

      <t-table
        rowKey="index"
        :columns="columns"
        :data="data"
        :pagination="pagination1"
        dragSort="row"
        @drag-sort="onDragSort"
        lazyLoad
      >
        <template #status="{ row }">
          <p class="status" :class="['', 'warning', 'unhealth'][row && row.status]">
            {{ ['健康', '警告', '异常'][row && row.status] }}
          </p>
        </template>
      </t-table>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { ref, reactive } from 'vue';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';

const initialColumns = [
  {
    colKey: 'index',
    title: '编号',
  },
  {
    colKey: 'applicant',
    title: '申请人',
  },
  {
    colKey: 'status',
    title: '申请状态',
    cell: (h, { row }) => {
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
const initialData = new Array(500).fill(5).map((_, i) => ({
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
const data = ref([...initialData]);
const columns = ref(initialColumns);
// const pagination = reactive({
//   current: 1,
//   pageSize: 5,
//   total: 500,
// });
// 非受控用法
const pagination1 = reactive({
  defaultCurrent: 1,
  defaultPageSize: 5,
  total: 500,
});
// currentData is going to be deprecated
const onDragSort = ({
  currentIndex, current, targetIndex, target, data: dragSortData, newData, e,
}) => {
  console.log('重新排序', currentIndex, current, targetIndex, target, dragSortData, newData, e);
  data.value = newData;
};
</script>

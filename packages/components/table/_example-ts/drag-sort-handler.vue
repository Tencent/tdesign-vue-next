<template>
  <div class="demo-container t-table-demo-sort">
    <t-space>
      <t-checkbox v-model="loading"> 加载状态 </t-checkbox>
      <t-button size="small" variant="base" @click="resetData">重置数据</t-button>
    </t-space>
    <div class="item">
      <!-- 拖拽排序涉及到 data 的变更，相对比较慎重，因此仅支持受控用法 -->
      <t-table
        row-key="index"
        :columns="columns"
        :data="data"
        :loading="loading"
        drag-sort="row-handler"
        lazy-load
        @drag-sort="onDragSort"
      >
      </t-table>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { TableProps, ButtonProps } from 'tdesign-vue-next';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon, MoveIcon } from 'tdesign-icons-vue-next';
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
const initialData: TableProps['data'] = [];
for (let i = 0; i < 5; i++) {
  initialData.push({
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
  });
}
const columns: TableProps['columns'] = [
  {
    colKey: 'drag',
    // 列拖拽排序必要参数
    title: '排序',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: (h) => (
      <span>
        <MoveIcon />
      </span>
    ),
    width: 46,
  },
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
const loading = ref<TableProps['loading']>(false);
const data = ref<TableProps['data']>([...initialData]);
const resetData: ButtonProps['onClick'] = () => {
  data.value = [];
};

// { currentIndex, targetIndex, current, target, data, newData, e }
const onDragSort: TableProps['onDragSort'] = (params) => {
  console.log('交换行', params);
  data.value = params.newData;
};

// 拖拽排序场景中：调整某个元素的顺序
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function swapDragArrayElement(data, currentIndex, targetIndex) {
//   const newData = [...data];
//   if (targetIndex - currentIndex > 0) {
//     newData.splice(targetIndex + 1, 0, newData[currentIndex]);
//     newData.splice(currentIndex, 1);
//   } else {
//     newData.splice(targetIndex, 0, newData[currentIndex]);
//     newData.splice(currentIndex + 1, 1);
//   }
//   return newData;
// }
</script>

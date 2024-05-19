<template>
  <t-table :data="data" :columns="columns" rowKey="property" lazyLoad>
    <!-- 自定义表头，title值为插槽名称  -->
    <template #title-slot-name> <user-circle-icon /> 类型 </template>
  </t-table>
</template>
<script setup lang="jsx">
import { ref } from 'vue';
import {
  UserCircleIcon, CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseCircleFilledIcon,
} from 'tdesign-icons-vue';

const initialData = [];
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
const initialColumns = [
  {
    colKey: 'applicant',
    title: 'title-slot-name',
    width: 120,
  },
  {
    colKey: 'matters',
    title: (h, { colIndex }) => <b style="font-wight: bold">{['', '申请事项'][colIndex]}</b>,
  },
  {
    colKey: 'status',
    title: '审批状态',
    width: 120,
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
    title: '邮箱地址',
    colKey: 'detail.email',
    width: 200,
  },
  {
    colKey: 'createTime',
    // render 可以渲染表头，也可以渲染单元格。但 title 只能渲染表头，cell 只能渲染单元格
    render(h, context) {
      const { type, row, col } = context;
      return {
        title: '申请时间',
        cell: row && row[col.colKey],
      }[type];
    },
  },
];
const data = ref(initialData);
const columns = ref(initialColumns);
</script>

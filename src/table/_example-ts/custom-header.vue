<template>
  <div>
    <t-table :data="data" :columns="columns" row-key="property" lazy-load>
      <!-- 自定义表头，title值为插槽名称  -->
      <template #title-slot-name>
        <div style="display: flex; align-items: center"><UserCircleIcon style="margin-right: 8px" />申请人</div>
      </template>
    </t-table>
  </div>
</template>
<script lang="tsx" setup>
import { TableProps } from 'tdesign-vue-next';
import {
  UserCircleIcon,
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon,
  CloseCircleFilledIcon,
} from 'tdesign-icons-vue-next';
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
const data: TableProps['data'] = [];
for (let i = 0; i < 5; i++) {
  data.push({
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
    colKey: 'applicant',
    title: 'title-slot-name',
    width: 120,
  },
  {
    colKey: 'matters',
    title: (h, { colIndex }) => <b style="font-wight: bold">{['', '申请事项'][colIndex]}</b>,
  },
  {
    title: '审批状态',
    colKey: 'status',
    // 使用 cell 方法自定义单元格：
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
</script>
<style scoped>
.link {
  color: #0052d9;
  text-decoration: none;
}
.t-icon {
  font-size: 16px;
}
</style>

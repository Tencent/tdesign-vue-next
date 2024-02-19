<template>
  <div style="width: 100%">
    <t-table :data="data" :columns="columns" row-key="property">
      <!-- 插槽方式 自定义单元格：cell 的值为插槽名称，参数有：{col, colIndex, row, rowIndex}  -->
      <template #type-slot-name="{ col, row }">
        {{ row[col.colKey] }}
      </template>

      <!-- 插槽方式 自定义单元格， colKey 的值默认为插槽名称  -->
      <template #status="{ row }">
        <t-tag shape="round" :theme="statusNameListMap[row.status].theme" variant="light-outline">
          <CheckCircleFilledIcon v-if="row.status === 0" />
          <CloseCircleFilledIcon v-else-if="row.status === 1" />
          <ErrorCircleFilledIcon v-else />
          {{ statusNameListMap[row.status].label }}
        </t-tag>
      </template>
    </t-table>
  </div>
</template>
<script lang="tsx" setup>
import { TableProps } from 'tdesign-vue-next';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
const data: TableProps['data'] = [];
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
for (let i = 0; i < 5; i++) {
  data.push({
    index: i + 1,
    applicant: ['贾明', '张三', '王芳'][i % 3],
    status: i % 3,
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    time: [2, 3, 1, 4][i % 4],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
  });
}
const columns: TableProps['columns'] = [
  {
    colKey: 'applicant',
    title: '申请人',
    // type-slot-name 会被用于自定义单元格的插槽名称
    cell: 'type-slot-name',
    width: 120,
  },
  {
    title: '审批状态',
    // 没有 cell 的情况下， platform 会被用作自定义单元格的插槽名称
    colKey: 'status',
    width: 120,
  },
  {
    colKey: 'matters',
    title: '申请事项',
    // 使用 cell 方法自定义单元格：
    cell: (h, { col, row }) => <div>{row[col.colKey]}</div>,
  },
  {
    title: '邮箱地址',
    colKey: 'email',
    // render 即可渲染表头，也可以渲染单元格。但 cell 只能渲染单元格，title 只能渲染表头
    render(h, context) {
      const { type, row, col } = context;
      if (type === 'title') return '邮箱地址';
      return <div>{row[col.colKey]}</div>;
    },
  },
  {
    colKey: 'createTime',
    title: '申请时间',
  },
];
</script>

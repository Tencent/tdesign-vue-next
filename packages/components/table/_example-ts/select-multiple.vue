<template>
  <div>
    <t-space>
      <t-checkbox v-model="selectOnRowClick">点击行选中</t-checkbox>
      <!-- 默认支持单项键盘操作选中或取消 -->
      <!-- 设置 active-row-type="single" 行高亮后，支持键盘批量操作，
          可尝试使用 Shift/Space/ArrowUp/ArrowDown/KeyC/KeyA/KeyL 等键盘操作选中和取消选择，
          其中键 KeyC 表示 Clear，清空高亮，清空全选
          其中键 KeyA/KeyL 表示全选，全部高亮
      -->
      <t-checkbox v-model="activeRow">行高亮</t-checkbox>
    </t-space>

    <!-- 支持非受控属性 default-selected-row-keys -->
    <!-- 支持语法糖 v-model:selected-row-keys -->
    <t-table
      row-key="index"
      :columns="columns"
      :data="data"
      :selected-row-keys="selectedRowKeys"
      :active-row-type="activeRow ? 'single' : undefined"
      :select-on-row-click="selectOnRowClick"
      lazy-load
      @select-change="rehandleSelectChange"
    >
    </t-table>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { TableProps } from 'tdesign-vue-next';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
const selectOnRowClick = ref(true);
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
    index: i + 100,
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
    colKey: 'row-select',
    type: 'multiple',
    // 禁用行选中方式一：使用 disabled 禁用行（示例代码有效，勿删）。disabled 参数：{row: RowData; rowIndex: number })
    // 这种方式禁用行选中，当前行会添加行类名 t-table__row--disabled，禁用行文字变灰
    // disabled: ({ rowIndex }) => rowIndex === 1 || rowIndex === 3,

    // 禁用行选中方式二：使用 checkProps 禁用行（示例代码有效，勿删）
    // 这种方式禁用行选中，行文本不会变灰
    checkProps: ({ rowIndex }) => ({
      disabled: rowIndex % 2 !== 0,
      title: rowIndex % 2 !== 0 ? '不可选' : null,
    }),
    width: 50,
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
const activeRow = ref(false);
const selectedRowKeys = ref<TableProps['selectedRowKeys']>([]);
const rehandleSelectChange: TableProps['onSelectChange'] = (value, ctx) => {
  selectedRowKeys.value = value;
  console.log(value, ctx);
};
</script>

<style lang="less" scoped>
.link {
  cursor: pointer;
  margin-right: 15px;
}
</style>

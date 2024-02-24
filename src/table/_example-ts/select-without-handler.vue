<template>
  <t-space direction="vertical" class="t-table-demo__select-without-handler">
    <t-space align="center">
      <t-radio-group v-model="rowSelectionType" variant="default-filled">
        <t-radio-button value="single">单选</t-radio-button>
        <t-radio-button value="multiple">多选</t-radio-button>
      </t-radio-group>

      <t-checkbox v-if="rowSelectionType === 'single'" v-model="rowSelectionAllowUncheck">是否允许取消选中</t-checkbox>
    </t-space>
    <t-table
      row-key="index"
      :columns="columns"
      :data="data"
      :selected-row-keys="selectedRowKeys"
      select-on-row-click
      :row-selection-type="rowSelectionType"
      :active-row-type="activeRow ? 'single' : undefined"
      :row-selection-allow-uncheck="rowSelectionAllowUncheck"
      lazy-load
      @select-change="rehandleSelectChange"
    >
    </t-table>
  </t-space>
</template>

<script lang="tsx">
export default {
  name: '',
};
</script>

<script lang="tsx" setup>
import { ref } from 'vue';
import { TableProps } from 'tdesign-vue-next';
const rowSelectionType = ref<TableProps['rowSelectionType']>('single');
const rowSelectionAllowUncheck = ref(false);
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
    title: '申请人',
    width: '100',
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
const selectedRowKeys = ref<TableProps['selectedRowKeys']>([2]);
const rehandleSelectChange: TableProps['onSelectChange'] = (value, { selectedRowData }) => {
  selectedRowKeys.value = value;
  console.log(value, selectedRowData);
};
</script>

<style lang="less">
.t-table-demo__select-without-handler {
  .t-table .t-table__row--selected {
    > td {
      color: var(--td-brand-color);
      font-weight: bold;
    }
  }
}
</style>

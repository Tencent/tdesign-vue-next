<template>
  <t-space direction="vertical">
    <t-space align="center">
      <t-radio-group v-model="activeRowType" variant="default-filled">
        <t-radio-button value="">不高亮</t-radio-button>
        <t-radio-button value="single">单行高亮</t-radio-button>
        <t-radio-button value="multiple">多行高亮</t-radio-button>
      </t-radio-group>
      <t-checkbox v-model="hover"> 显示悬浮效果 </t-checkbox>
    </t-space>

    <!-- v-model:activeRowKeys 父组件控制高亮行 -->
    <!-- defaultActiveRowKeys 组件内部控制高亮行，父组件无法使用这个属性控制 -->
    <t-table
      row-key="key"
      :data="tableData"
      :columns="columns"
      :active-row-type="activeRowType"
      :hover="hover"
      lazy-load
      @active-change="onActiveChange"
    ></t-table>
  </t-space>
</template>

<script lang="tsx">
export default {
  name: 'HighlightTable',
};
</script>

<script lang="tsx" setup>
import { ref, watch } from 'vue';
import { TableProps } from 'tdesign-vue-next';
const activeRowType = ref<TableProps['activeRowType']>('single');
const hover = ref(false);
const tableData: TableProps['data'] = getTableData();
const columns: TableProps['columns'] = [
  {
    colKey: 'applicant',
    title: '申请人',
    width: '100',
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
const onActiveChange: TableProps['onActiveChange'] = (highlightRowKeys, ctx) => {
  console.log(highlightRowKeys, ctx);
};
watch([activeRowType], ([activeRowType]) => {
  if (!activeRowType) {
    hover.value = true;
  }
});
function getTableData(total = 5) {
  const data = [];
  for (let i = 0; i < total; i++) {
    data.push({
      key: i + 1,
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
  return data;
}
</script>

<template>
  <div>
    <div>
      <t-radio-group v-model="tableLayout" variant="default-filled">
        <t-radio-button value="fixed">table-layout: fixed</t-radio-button>
        <t-radio-button value="auto">table-layout: auto</t-radio-button>
      </t-radio-group>
    </div>
    <br /><br />
    <div><t-checkbox v-model="fixedTopAndBottomRows">是否冻结首尾两行</t-checkbox></div>
    <br /><br />
    <!-- 如果希望表格列宽自适应，设置 `table-layout: auto` 即可。如果列字段过多超出表格宽度，还需同时设置 table-content-width -->
    <!-- fixedRows: [2, 2] 表示冻结表头两行和表尾两行 -->
    <!-- footData 可以是多行，均支持固定在底部 -->
    <t-table
      row-key="index"
      :data="data"
      :foot-data="[{}]"
      :columns="columns"
      :table-layout="tableLayout"
      :max-height="fixedTopAndBottomRows ? 500 : 300"
      :fixed-rows="fixedTopAndBottomRows ? [2, 2] : undefined"
      bordered
    ></t-table>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const data = [];
for (let i = 0; i < 20; i++) {
  data.push({
    index: i,
    platform: i % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['-', '0', '[]', '{}'][i % 4],
    detail: {
      position: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    description: '数据源',
  });
}

const tableLayout = ref('fixed');
const fixedTopAndBottomRows = ref(false);

const columns = [
  {
    width: 120,
    colKey: 'platform',
    title: '平台',
    foot: '汇总',
  },
  {
    width: 120,
    colKey: 'type',
    title: '类型',
    foot: 'Number(5)',
  },
  {
    colKey: 'default',
    title: '默认值',
    foot: '-',
  },
  {
    colKey: 'needed',
    title: '必传',
    foot: '否(6)',
  },
  {
    colKey: 'detail.position',
    title: '详情信息',
    width: 200,
    ellipsis: true,
    foot: '-',
  },
  {
    colKey: 'description',
    title: '说明',
    foot: '数据(10)',
  },
];
</script>

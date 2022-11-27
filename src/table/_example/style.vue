<template>
  <div class="t-demo__style">
    <!-- row-class-name 设置行类名 -->
    <t-table row-key="id" :data="data" :columns="columns" :row-class-name="getRowClassName">
      <template #footerSummary>
        <div class="t-table__row-filter-inner">汇总：近期数据波动较大</div>
      </template>
    </t-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const data = [];
const total = 5;
for (let i = 0; i < total; i++) {
  data.push({
    id: i,
    framework: ['tdesign-vue', 'tdesign-react', 'tdesign-vue-next'][i % 3],
    data: ['100,000', '21,514', '7,884', '1,290'][i % 4],
    ringRatio: ['8%', '30%', '75%', '200%'][i % 4],
    yearRatio: ['10%', '20%', '80%', '100%'][i % 4],
  });
}

const columns = ref([
  // 序号示例代码，序号在跨分页场景中依旧保持连贯
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: 64,
  },
  // 序号示例代码，序号在每一页都从 1 开始
  // {
  //   colKey: 'serialNumber',
  //   title: '序号',
  //   align: 'center',
  //   width: 64,
  //   cell: (h, { rowIndex }) => rowIndex + 1,
  // },
  { colKey: 'framework', title: '框架' },
  {
    colKey: 'data',
    title: '数据',
    align: 'right',
    // 设置单元格内联样式
    attrs: ({ type, row }) => ({
      style:
        type === 'td' && row.data === '21,514'
          ? {
              color: 'green',
              fontWeight: 600,
              backgroundColor: 'var(--td-brand-color-1)',
              fontSize: '16px',
            }
          : undefined,
    }),
  },
  {
    colKey: 'ringRatio',
    title: '环比',
    align: 'right',
    // 设置单元格类名
    className: ({ type, row }) => {
      if (type === 'td' && row.ringRatio === '200%') {
        return 'custom-cell-class-name';
      }
      return '';
    },
  },
  {
    colKey: 'yearRatio',
    title: '同比',
    align: 'right',
    // 设置列类名
    className: 'last-column-class-name',
  },
]);

const getRowClassName = ({ row, rowIndex }) => {
  if (rowIndex === 2) return 'custom-third-class-name';
  return '';
};
</script>

<style>
.t-demo__style .t-table .custom-third-class-name > td {
  color: green;
  font-weight: bold;
}

.t-demo__style .t-table td.last-column-class-name {
  color: orange;
  font-weight: bold;
}

.t-table td.custom-cell-class-name {
  color: orange;
  font-size: 18px;
  font-weight: bold;
}
</style>

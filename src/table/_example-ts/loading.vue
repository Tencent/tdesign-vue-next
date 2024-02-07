<template>
  <div>
    <t-table :data="data" :columns="columns" :row-key="rowKey" :size="size" :loading="true" />
    <t-table :data="[]" :columns="columns" :row-key="rowKey" :size="size" :loading="true">
      <template #loading>
        <div class="t-table--loading-message">这里使用插槽自定义加载状态</div>
      </template>
    </t-table>
    <t-table :data="[]" :columns="columns" :row-key="rowKey" :size="size" :loading="renderLoading" />
  </div>
</template>
<script lang="tsx" setup>
import { TableProps } from 'tdesign-vue-next';
const data: TableProps['data'] = [];
const columns: TableProps['columns'] = [
  {
    align: 'left',
    width: '100',
    className: 'row',
    ellipsis: true,
    colKey: 'type',
    title: '类型',
  },
  {
    align: 'left',
    width: '100',
    className: 'test',
    ellipsis: true,
    colKey: 'platform',
    title: '平台',
  },
  {
    align: 'left',
    width: '100',
    className: 'test2',
    ellipsis: true,
    colKey: 'property',
    title: '属性',
  },
  {
    align: 'left',
    width: '100',
    className: 'test4',
    ellipsis: true,
    colKey: 'default',
    title: '默认值',
  },
  {
    align: 'left',
    width: '100',
    className: 'test3',
    ellipsis: true,
    colKey: 'needed',
    title: '是否必传',
  },
  {
    align: 'left',
    width: '100',
    className: 'row',
    ellipsis: true,
    colKey: 'description',
    title: '说明',
  },
];
const renderLoading: TableProps['loading'] = () => (
  <div class="t-table--loading-message">这里使用渲染函数定义加载状态</div>
);
const rowKey: TableProps['rowKey'] = 'property';
const size: TableProps['size'] = 'small';
</script>

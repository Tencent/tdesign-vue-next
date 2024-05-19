<template>
  <div>
    <t-table :data="data" :columns="columns" :row-key="rowKey" />
    <br /><br />
    <t-table :data="data" :columns="columns" :row-key="rowKey" lazy-load>
      <template #empty>
        <span
          style="display: flex; align-items: center; justify-content: center; height: 100px; color: rgba(0, 0, 0, 0.26)"
        >
          😊 我是自定义的空内容 😊: slot
        </span>
      </template>
    </t-table>
    <br /><br />
    <t-table :data="data" :columns="columns" :empty="empty" :row-key="rowKey" />
  </div>
</template>
<script lang="tsx" setup>
import { TableProps } from 'tdesign-vue-next';
const columns: TableProps['columns'] = [
  {
    colKey: 'type',
    title: '类型',
  },
  {
    colKey: 'platform',
    title: '平台',
  },
  {
    colKey: 'property',
    title: '属性',
  },
  {
    colKey: 'default',
    title: '默认值',
  },
  {
    colKey: 'needed',
    title: '是否必传',
  },
  {
    colKey: 'description',
    title: '说明',
  },
];
const data: TableProps['data'] = [];
const rowKey: TableProps['rowKey'] = 'property';
const empty: TableProps['empty'] = () => (
  <span style="display:flex;align-items:center;justify-content:center;height:100px;color: rgba(0, 0, 0, 0.26)">
    😊 我是自定义的空内容 😊: empty function
  </span>
);
</script>

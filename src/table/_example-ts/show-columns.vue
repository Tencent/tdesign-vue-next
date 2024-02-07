<template>
  <div>
    <t-table row-key="id" :columns="columns" :data="data" show-columns lazy-load>
      <template #status="{ row }">
        <p v-if="row.status === 0" class="status">健康</p>
        <p v-if="row.status === 1" class="status unhealth">异常</p>
      </template>
      <template #op-column>
        <p>操作</p>
      </template>
      <template #op="slotProps">
        <a class="link" @click="rehandleClickOp(slotProps)">管理</a>
        <a class="link" @click="rehandleClickOp(slotProps)">删除</a>
      </template>
    </t-table>
  </div>
</template>

<script lang="tsx" setup>
import { TableProps } from 'tdesign-vue-next';
const columns: TableProps['columns'] = [
  {
    colKey: 'instance',
    title: '集群名称',
    width: 150,
  },
  {
    colKey: 'status',
    title: '状态',
    width: 100,
  },
  {
    colKey: 'owner',
    title: '管理员',
  },
  {
    colKey: 'description',
    title: '描述',
  },
  {
    colKey: 'op',
    width: 200,
  },
];
const data: TableProps['data'] = [
  {
    id: 1,
    instance: 'JQTest1',
    status: 0,
    owner: 'jenny;peter',
    description: 'test',
  },
  {
    id: '2',
    instance: 'JQTest2',
    status: 1,
    owner: 'jenny',
    description: 'test',
  },
  {
    id: 3,
    instance: 'JQTest3',
    status: 0,
    owner: 'jenny',
    description: 'test',
  },
  {
    id: 4,
    instance: 'JQTest4',
    status: 1,
    owner: 'peter',
    description: 'test',
  },
];
</script>

<style lang="less" scoped>
:deep([class*='t-button']) .t-icon {
  background-color: transparent;
}
.link {
  cursor: pointer;
  margin-right: 15px;
}
</style>

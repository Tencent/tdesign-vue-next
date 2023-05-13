<template>
  <t-pagination
    v-model="current"
    v-model:pageSize="pageSize"
    :total="645"
    show-sizer
    :page-size-options="pageSizeOptions"
    @change="onChange"
    @page-size-change="onPageSizeChange"
    @current-change="onCurrentChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin, PageInfo } from 'tdesign-vue-next';

const pageSizeOptions = [
  { label: '每页 10 条', value: 10 },
  { label: '每页 30 条', value: 30 },
  { label: '每页 100 条', value: 100 },
  { label: '每页 50 条', value: 50 },
];
const current = ref(1);
const pageSize = ref(30);

const onPageSizeChange = (size: number, pageInfo: PageInfo) => {
  console.log('page-size:', size, pageInfo);
  MessagePlugin.success(`pageSize变化为${size}`);
};

const onCurrentChange = (index: number, pageInfo: PageInfo) => {
  MessagePlugin.success(`转到第${index}页`);
  console.log(pageInfo);
};

const onChange = (pageInfo: PageInfo) => {
  console.log(pageInfo);
};
</script>

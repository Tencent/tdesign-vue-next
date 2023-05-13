<template>
  <t-pagination
    v-model="current"
    v-model:pageSize="pageSize"
    :total="100"
    size="small"
    theme="simple"
    @change="onChange"
    @page-size-change="onPageSizeChange"
    @current-change="onCurrentChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin, PageInfo } from 'tdesign-vue-next';

const current = ref(1);
const pageSize = ref(5);

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

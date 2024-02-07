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

<script lang="ts" setup>
import { ref } from 'vue';
import { MessagePlugin, PaginationProps } from 'tdesign-vue-next';
const current = ref(1);
const pageSize = ref(5);
const onPageSizeChange: PaginationProps['onPageSizeChange'] = (size) => {
  console.log('page-size:', size);
  MessagePlugin.success(`pageSize变化为${size}`);
};
const onCurrentChange: PaginationProps['onCurrentChange'] = (index, pageInfo) => {
  MessagePlugin.success(`转到第${index}页`);
  console.log(pageInfo);
};
const onChange: PaginationProps['onChange'] = (pageInfo) => {
  console.log(pageInfo);
};
</script>

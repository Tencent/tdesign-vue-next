<template>
  <t-space direction="vertical" size="large">
    <t-pagination
      v-model="current"
      v-model:pageSize="pageSize"
      :total="100"
      @change="onChange"
      @page-size-change="onPageSizeChange"
      @current-change="onCurrentChange"
    />
    <!-- :pageSizeOptions="[]" 表示隐藏分页器选项 -->
    <!-- 非受控用法，代码有效，勿删。 -->
    <t-pagination
      :total="36"
      :default-current="2"
      :default-page-size="10"
      show-first-and-last-page-btn
      @current-change="onCurrentChange"
      @page-size-change="onPageSizeChange"
      @change="onChange"
    />
  </t-space>
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

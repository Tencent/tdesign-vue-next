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

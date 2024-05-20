<template>
  <div>
    <t-pagination
      v-model="current"
      :total="36"
      :page-size.sync="pageSize"
      @current-change="onCurrentChange"
      @page-size-change="onPageSizeChange"
      @change="onChange"
    />
    <br /><br />
    <!-- :pageSizeOptions="[]" 表示隐藏分页器选项 -->
    <!-- 非受控用法，代码有效，勿删。 -->
    <t-pagination
      showFirstAndLastPageBtn
      :total="36"
      :default-current="2"
      :default-page-size="10"
      @current-change="onCurrentChange"
      @page-size-change="onPageSizeChange"
      @change="onChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const current = ref(12);
const pageSize = ref(5);
const onPageSizeChange = (size, pageInfo) => {
  console.log('Page Size:', pageSize.value, size, pageInfo);
};
const onCurrentChange = (current, pageInfo) => {
  console.log('Current Page', current.value, current, pageInfo);
};
const onChange = (pageInfo) => {
  console.log('Page Info: ', pageInfo);
};
</script>

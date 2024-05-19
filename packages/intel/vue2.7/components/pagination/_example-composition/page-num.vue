<template>
  <div>
    <t-pagination
      :total="645"
      :page-size.sync="pageSize"
      v-model="current"
      :on-page-size-change="onPageSizeChange"
      show-sizer
      :page-size-options="pageSizeOptions"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pageSize = ref(30);
const current = ref(1);
const pageSizeOptions = ref([
  {
    label: '每页 10 条',
    value: 10,
  },
  {
    label: '每页 30 条',
    value: 30,
  },
  {
    label: '每页 100 条',
    value: 100,
  },
  {
    label: '每页 50 条',
    value: 50,
  },
]);
const onPageSizeChange = (pageSize, pageInfo) => {
  console.log(pageSize, pageInfo);
};
</script>

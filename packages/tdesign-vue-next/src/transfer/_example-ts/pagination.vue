<template>
  <t-transfer
    v-model="targetValue"
    theme="primary"
    :data="list"
    :checked-value="checkedValue"
    :pagination="pagination"
    :on-page-change="handlePageChange"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TransferProps } from 'tdesign-vue-next';
const list: TransferProps['data'] = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
  });
}
const targetValue = ref([]);
const checkedValue = ref([]);
const pagination = ref<TransferProps['pagination']>([
  {
    pageSize: 10,
    defaultCurrent: 1,
  },
  {
    pageSize: 5,
    defaultCurrent: 1,
  },
]);
const handlePageChange: TransferProps['onPageChange'] = (...args) => {
  console.log('handlePageChange', args);
};
</script>

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
<script setup lang="ts">
import { PageInfo } from 'tdesign-vue-next';
import { TransferListType } from 'tdesign-vue-next/es/transfer/type';
import { ref } from 'vue';

type List = { value: string; label: string };

const list: List[] = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
  });
}
const targetValue = ref([]);
const checkedValue = ref([]);
const pagination = ref([
  {
    pageSize: 10,
    defaultCurrent: 1,
  },
  {
    pageSize: 5,
    defaultCurrent: 1,
  },
]);

const handlePageChange = (page: PageInfo, context: { type: TransferListType }) => {
  console.log('handlePageChange', page, context.type);
};
</script>

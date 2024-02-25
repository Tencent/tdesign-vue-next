<template>
  <t-pagination v-model="current" v-model:page-size="pageSize" :total="total" :total-content="renderTotalContent" />
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { PaginationProps } from 'tdesign-vue-next';
const current = ref(12);
const pageSize = ref(10);
const total = ref(685);
const renderTotalContent: PaginationProps['totalContent'] = () => {
  return <div class="t-pagination__total">{`共 ${total.value} 项数据`}</div>;
};
</script>

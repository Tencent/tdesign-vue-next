<template>
  <t-pagination v-model="current" v-model:page-size="pageSize" :total="total" :total-content="renderTotalContent" />
</template>

<script setup lang="jsx">
import { ref } from 'vue';

const current = ref(12);
const pageSize = ref(10);
const total = ref(685);

const renderTotalContent = () => {
  return <div class="t-pagination__total">{`共 ${total.value} 项数据`}</div>;
};
</script>

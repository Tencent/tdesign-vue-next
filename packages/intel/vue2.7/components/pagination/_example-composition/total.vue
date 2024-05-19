<template>
  <div>
    <t-pagination v-model="current" :total="total" :page-size.sync="pageSize" :totalContent="renderTotalContent" />
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue';

const current = ref(12);
const pageSize = ref(10);
const total = ref(685);
const renderTotalContent = () => <div class="t-pagination__total">{`共 ${total.value} 项数据`}</div>;
</script>

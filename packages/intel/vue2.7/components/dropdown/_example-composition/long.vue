<template>
  <div>
    <t-dropdown :options="options" :maxHeight="400" :minColumnWidth="88">
      <t-button variant="text">下拉菜单</t-button>
    </t-dropdown>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const initialOptions = Array.from({
  length: 20,
}).map((v, k) => ({
  content: `操作${k + 1}`,
  value: k + 1,
}));
const options = ref(initialOptions);
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>

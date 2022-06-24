<template>
  <div class="tdesign-demo-select-base">
    <t-select v-model="value1" :options="options1" placeholder="请选择" />
    <br /><br />
    <t-select v-model="value2" :options="options1" placeholder="请选择" multiple />
  </div>
</template>
<script setup lang="jsx">
import { ref } from 'vue';

const options = [];
for (let i = 0; i < 100; i++) {
  options.push({ label: `第 ${i} 项`, value: i });
}
const options1 = options;

const value1 = ref(50);
const value2 = ref([50, 70]);
</script>
<style scoped>
.tdesign-demo-select-base {
  width: 450px;
  display: flex;
}
</style>

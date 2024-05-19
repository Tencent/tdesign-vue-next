<template>
  <t-space direction="vertical">
    <t-select v-model="mode" class="demo-select-base">
      <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
    </t-select>
    <t-calendar :mode="mode"></t-calendar>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const mode = ref('year');
const options = ref([
  {
    value: 'month',
    label: '日历',
  },
  {
    value: 'year',
    label: '月历',
  },
]);
</script>

<style scoped>
.demo-select-base {
  width: 200px;
  display: inline-block;
  margin: 0 10px 0 0;
}
</style>

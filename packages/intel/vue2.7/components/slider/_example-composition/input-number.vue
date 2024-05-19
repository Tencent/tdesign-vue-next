<template>
  <t-space direction="vertical" size="60px">
    <t-slider v-model="value1" :show-tooltip="true" :inputNumberProps="inputNumberProps" :step="0.1" />
    <t-slider v-model="value2" range :show-tooltip="true" :inputNumberProps="inputNumberProps" />
  </t-space>
</template>
<script setup>
import { ref, reactive } from 'vue';

const value1 = ref(12);
const value2 = ref([30, 70]);
const inputNumberProps = reactive({
  theme: 'column',
  autoWidth: true,
});
</script>

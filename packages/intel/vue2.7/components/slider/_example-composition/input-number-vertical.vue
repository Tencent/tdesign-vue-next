<template>
  <t-space :style="{ height: '300px' }" size="60px">
    <t-slider v-model="value1" :layout="layout" :show-tooltip="true" :inputNumberProps="inputNumberProps" />
    <t-slider v-model="value2" :layout="layout" range :show-tooltip="true" :inputNumberProps="inputNumberProps" />
  </t-space>
</template>
<script setup>
import { ref, reactive } from 'vue';

const value1 = ref(12);
const value2 = ref([30, 70]);
const inputNumberProps = reactive({
  theme: 'column',
});
const layout = ref('vertical');
</script>

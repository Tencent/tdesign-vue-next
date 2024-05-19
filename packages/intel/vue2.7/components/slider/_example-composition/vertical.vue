<template>
  <t-space :style="{ height: '300px' }" size="60px">
    <t-slider v-model="value1" :layout="layout" :show-tooltip="true" />
    <t-slider v-model="value2" :layout="layout" range :show-tooltip="true" />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const value1 = ref(12);
const value2 = ref([30, 70]);
const layout = ref('vertical');
</script>
<style scoped>
.vertical-block {
  display: inline-block;
  padding: 30px 24px;
  height: 300px;
}
</style>

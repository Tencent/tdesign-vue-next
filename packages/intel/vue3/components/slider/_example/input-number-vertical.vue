<template>
  <t-space>
    <div class="number-vertical-block">
      <t-slider v-model="value1" :layout="layout" :show-tooltip="true" :input-number-props="inputNumberProps" />
    </div>

    <div class="number-vertical-block">
      <t-slider v-model="value2" :layout="layout" range :show-tooltip="true" :input-number-props="inputNumberProps" />
    </div>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const value1 = ref(12);
const value2 = ref([30, 70]);
const inputNumberProps = { theme: 'column' };
const layout = 'vertical';
</script>
<style>
.number-vertical-block {
  display: inline-block;
  padding: 30px 24px;
  height: 300px;
}
</style>

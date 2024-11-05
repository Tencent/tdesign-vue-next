<template>
  <t-space direction="vertical">
    <t-input-number v-model="value1" large-number :decimal-places="2" step="1" style="width: 300px"></t-input-number>

    <!-- format 存在时，decimalPlaces 失效 -->
    <t-input-number v-model="value3" large-number step="100" :format="format" style="width: 300px"></t-input-number>

    <t-input-number v-model="value2" large-number step="0.888" style="width: 300px"></t-input-number>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InputNumberProps } from 'tdesign-vue-next';
const value1 = ref('19999999999999999.977');
const value2 = ref('0.8975527383412673418');
const value3 = ref('19999999999999999.977');
const format: InputNumberProps['format'] = (val) => {
  return String(val).replace(/\d{1,3}(?=(\d{3})+(\.|$))/g, '$&,');
};
</script>

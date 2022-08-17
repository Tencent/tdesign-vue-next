<template>
  <t-space direction="vertical">
    <t-input-number v-model="value1" :max="15" :min="-2" :format="(value) => `${value} %`" auto-width></t-input-number>

    <!-- 小数位数和格式化函数组合使用 -->
    <t-input-number
      v-model="value2"
      :decimal-places="2"
      :format="(value, { fixedNumber }) => `${fixedNumber} %`"
      auto-width
    ></t-input-number>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(3);
const value2 = ref(3.01);
</script>

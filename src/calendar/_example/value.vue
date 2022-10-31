<template>
  <t-space direction="vertical">
    <t-form layout="inline">
      <t-form-item label="自己指定年：">
        <t-input v-model="year" />
      </t-form-item>
      <t-form-item label="自己指定年月：">
        <t-input v-model="month" />
      </t-form-item>
    </t-form>
    <t-calendar :value="value" :year="year" :month="month" @month-change="monthChange" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const value = '2020-11-11'; // new Date(1998, 10, 11)
setTimeout(() => {
  year.value = 2018;
  month.value = 8;
}, 2000);
const year = ref(2020);
const month = ref(11);
const monthChange = (options) => {
  console.log(`月份切换 ${options.year}-${options.month}`);
};
</script>

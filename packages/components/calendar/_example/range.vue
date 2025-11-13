<template>
  <t-space direction="vertical">
    <t-form layout="inline">
      <t-form-item label="日历可选范围：">
        <t-date-range-picker v-model="range" mode="month" :disable-date="{ before: '1970-01' }" allow-input />
      </t-form-item>
    </t-form>
    <t-calendar :range="range" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const range = ref(['2018-08', '2028-04']);
</script>

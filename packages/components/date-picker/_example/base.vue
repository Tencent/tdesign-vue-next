<template>
  <t-space direction="vertical">
    <t-date-range-picker
      value-type="time-stamp"
      format="YYYY-MM-DD"
      :default-time="defaultTime"
      @change="handleChange"
    />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';
const defaultTime = ['00:00:00', '23:59:59'];

const date = ref([]);

function handleChange(value, context) {
  console.log('onChange:', value, context);
}
</script>

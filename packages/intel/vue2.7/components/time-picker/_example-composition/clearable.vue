<template>
  <t-space direction="vertical">
    <h3>具备清空按钮</h3>
    <t-time-picker v-model="time1" />
    <h3>禁止清空按钮</h3>
    <t-time-picker v-model="time2" :clearable="disabledClear" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const time1 = ref('11:12:10');
const time2 = ref('11:12:10');
const disabledClear = ref(false);
</script>

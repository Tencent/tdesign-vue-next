<template>
  <t-space direction="vertical">
    <h3>允许输入</h3>
    <t-time-picker v-model="time1" allowInput @blur="blur" @focus="focus" />
    <h3>禁止输入</h3>
    <t-time-picker v-model="time2" :allowInput="false" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const time1 = ref('20:22:33');
const time2 = ref('22:22:22');
const blur = (v) => {
  console.log('blur');
  console.log(v);
};
const focus = (v) => {
  console.log('focus');
  console.log(v);
};
</script>

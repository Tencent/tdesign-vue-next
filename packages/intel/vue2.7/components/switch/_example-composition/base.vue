<template>
  <t-space>
    <t-switch size="large"></t-switch>
    <t-switch size="large" v-model="checked" @change="onChange"></t-switch>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);
const onChange = (val) => {
  console.log(val);
};
</script>

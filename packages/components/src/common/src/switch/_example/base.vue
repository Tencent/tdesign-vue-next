<template>
  <t-space>
    <t-switch />
    <t-switch v-model="checked" @change="onChange" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);

const onChange = (val) => {
  console.log(val);
};
</script>

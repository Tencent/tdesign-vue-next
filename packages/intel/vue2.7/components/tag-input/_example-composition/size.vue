<template>
  <t-space direction="vertical" style="width: 80%">
    <t-tag-input v-model="tags1" size="small" clearable />

    <t-tag-input v-model="tags2" clearable />

    <t-tag-input v-model="tags3" size="large" clearable />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const tags1 = ref(['Vue', 'React']);
const tags2 = ref(['Vue', 'React']);
const tags3 = ref(['Vue', 'React']);
</script>

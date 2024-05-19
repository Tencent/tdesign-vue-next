<template>
  <t-tag-input v-model="tags" auto-width clearable />
</template>
<script setup>
import { ref } from 'vue';

const tags = ref(['Vue', 'React']);
</script>

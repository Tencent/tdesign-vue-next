<template>
  <div class="tdesign-demo-block-column" style="width: 80%">
    <t-tag-input v-model="tags" auto-width clearable />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tags = ref(['Vue', 'React']);
</script>

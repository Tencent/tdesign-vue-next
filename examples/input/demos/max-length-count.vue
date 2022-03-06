<template>
  <div class="tdesign-demo-block-column" style="max-width: 500px">
    <t-input v-model="input" :maxlength="5" :suffix="suffix" />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';

const input = ref('');
const suffix = computed(() => {
  return `${input.value.length}/5`;
});
</script>

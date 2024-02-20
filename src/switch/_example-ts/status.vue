<template>
  <t-space>
    <t-switch v-model="checked1" size="large"></t-switch>
    <t-switch v-model="checked2" size="large" loading></t-switch>
    <t-switch size="large" disabled></t-switch>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checked1 = ref(true);
const checked2 = ref(true);
</script>

<style scoped>
.switch-demo .tdesign-demo-block {
  width: 300px;
  display: flex;
  justify-content: space-around;
}
</style>

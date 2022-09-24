<template>
  <div class="switch-demo">
    <div class="tdesign-demo-block">
      <t-switch v-model="checked" size="large" />
      <t-switch size="medium" />
      <t-switch size="small" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);
</script>

<style scoped>
.switch-demo .tdesign-demo-block {
  width: 300px;
  display: flex;
  justify-content: space-around;
}
</style>

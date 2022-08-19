<template>
  <div class="loading-wrap-demo">
    <t-guide />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const loading = ref(true);
</script>
<style scoped>
.loading-wrap-demo {
  width: 170px;
}
.loading-wrap-demo .t-button + .t-button {
  margin-left: 24px;
}
</style>

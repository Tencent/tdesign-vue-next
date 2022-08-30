<template>
  <div class="demo-slider">
    <div class="block">
      <t-slider v-model="value1" />
    </div>

    <div class="block">
      <t-slider v-model="value2" range />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const value1 = ref(12);
const value2 = ref([30, 70]);
</script>
<style>
.block {
  padding: 30px 24px;
}
</style>

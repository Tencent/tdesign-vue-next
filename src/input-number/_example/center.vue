<script setup lang="ts">
import { ref } from 'vue';
const model = ref({
  str: 'str',
  num: 1,
});
</script>

<template>
  <pre>
    {{ model }}
  </pre>
  <t-input-number v-model="model.num" />
  <t-form :model="model">
    <t-form-item label="Str">
      <t-input v-model="model.str" />
    </t-form-item>
    <t-form-item label="Num">
      <!-- <t-input-number v-model="model.num" /> -->
    </t-form-item>
  </t-form>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

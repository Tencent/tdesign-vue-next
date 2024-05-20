<template>
  <t-input-number v-model="value" :max="15" :min="-5" :step="1.2" :decimal-places="2" @change="onChange" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(3.2);
const onChange = (ev) => {
  console.info(ev);
};
</script>

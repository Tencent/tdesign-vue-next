<template>
  <div>
    <t-input-number v-model="value" :max="15" :min="-2" :format="(value) => `${value}%`" @change="onChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(3);
const onChange = (ev) => {
  console.info(ev);
};
</script>

<template>
  <div>
    <t-input-number v-model="value" theme="column" :max="15" :min="-2" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(3);
</script>

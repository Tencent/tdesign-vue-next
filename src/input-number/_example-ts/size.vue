<template>
  <div>
    <t-input-number v-model="value1" size="small" :max="15" :min="-2" />

    <t-input-number v-model="value2" style="margin: 0 50px" :max="15" :min="-2" />

    <t-input-number v-model="value3" size="large" :max="15" :min="-2" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref(3);
const value2 = ref(3);
const value3 = ref(3);
</script>

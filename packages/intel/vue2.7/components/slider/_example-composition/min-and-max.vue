<template>
  <t-space direction="vertical" size="60px">
    <t-slider v-model="value1" :show-tooltip="true" :max="max" :min="min" :marks="marks" />

    <t-slider v-model="value2" range :show-tooltip="true" :max="max" :min="min" :marks="marks" />
  </t-space>
</template>
<script setup>
import { ref, reactive } from 'vue';

const value1 = ref(12);
const value2 = ref([12, 20]);
const min = ref(10);
const max = ref(30);
const marks = reactive({
  10: 'min:10',
  30: 'max:30',
});
</script>

<template>
  <t-time-picker-panel :value="value" @change="handleChange" />
</template>
<script setup>
import { ref } from 'vue';

const value = ref('11:11:11');

const handleChange = (v) => {
  value.value = v;
};
</script>

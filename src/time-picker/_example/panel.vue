<template>
  <div class="tdesign-demo-block">
    <time-picker-panel :value="value" @change="handleChange" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { TimePickerPanel } from 'tdesign-vue-next';

const value = ref('11:11:11');

const handleChange = (v) => {
  value.value = v;
};
</script>

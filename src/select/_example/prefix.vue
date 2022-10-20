<template>
  <t-select v-model="value" style="width: 200px" :options="options" clearable placeholder="-请选择-">
    <template #prefixIcon>
      <icon name="browse" style="margin-right: 8px" />
    </template>
  </t-select>
</template>
<script setup>
import { ref } from 'vue';
import { Icon } from 'tdesign-icons-vue-next';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];
const value = ref('');
</script>

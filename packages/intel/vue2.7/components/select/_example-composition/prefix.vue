<template>
  <t-select v-model="value" style="width: 200px" :options="options" clearable placeholder="-请选择-">
    <browse-icon slot="prefixIcon" style="margin-right: 8px" />
  </t-select>
</template>

<script setup>
import { ref } from 'vue';
import { BrowseIcon } from 'tdesign-icons-vue';

const options = ref([
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
  },
  {
    label: '选项三',
    value: '3',
  },
]);
const value = ref('');
</script>

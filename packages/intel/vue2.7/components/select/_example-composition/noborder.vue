<template>
  <t-space>
    <t-select
      v-model="value"
      :borderless="true"
      style="width: 200px"
      placeholder="-请选择-"
      clearable
      :options="options"
    />
    <t-select
      v-model="value2"
      :borderless="true"
      placeholder="-请选择-"
      clearable
      auto-width
      :options="options"
      multiple
    />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const options = ref([
  {
    label: '已选择的选项',
    value: '1',
  },
  {
    label: '短的选项二',
    value: '2',
  },
  {
    label: '选项内容过长的选择器选项',
    value: '3',
  },
]);
const value = ref('1');
const value2 = ref([]);
</script>

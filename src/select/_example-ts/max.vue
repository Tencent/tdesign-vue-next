<template>
  <t-select v-model="value" placeholder="-请选择-" multiple :max="2" :options="options" style="width: 200px" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { SelectProps } from 'tdesign-vue-next';
const options: SelectProps['options'] = [
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
];
const value = ref([]);
</script>

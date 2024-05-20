<template>
  <t-space>
    <t-select
      v-model="value"
      creatable
      filterable
      placeholder="单选支持自定义创建"
      :options="options"
      style="width: 200px; display: inline-block; margin: 0 20px 20px 0"
      @create="createOptions"
    />
    <t-select
      v-model="value2"
      creatable
      filterable
      multiple
      placeholder="多选支持自定义创建"
      :options="options"
      style="width: 400px; display: inline-block"
      @create="createOptions"
    />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

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
const value2 = ref([]);
const createOptions = (value) => {
  options.value.push({
    value,
    label: value,
  });
  console.log('create option:', value);
};
</script>

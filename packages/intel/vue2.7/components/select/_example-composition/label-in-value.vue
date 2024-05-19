<template>
  <t-space>
    <t-select
      v-model="value"
      valueType="object"
      clearable
      placeholder="-请选择-"
      :options="options"
      style="width: 200px; display: inline-block; margin-right: 20px"
      @change="handleChange"
    />
    <t-select
      v-model="value2"
      valueType="object"
      clearable
      multiple
      placeholder="-请选择-"
      :options="options"
      style="width: 200px; display: inline-block"
      @change="handleChange"
    />
  </t-space>
</template>

<script setup>
import { ref, reactive } from 'vue';

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
const value = reactive({
  value: '1',
  label: '选项一',
});
const value2 = ref([
  {
    value: '1',
    label: '选项一',
  },
]);
const handleChange = (value, context) => {
  console.log('handleChange:', value, context);
};
</script>

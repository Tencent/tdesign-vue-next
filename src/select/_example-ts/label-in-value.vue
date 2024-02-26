<template>
  <t-space direction="vertical">
    <t-select
      v-model="value"
      value-type="object"
      clearable
      placeholder="-请选择-"
      :options="options"
      style="width: 200px; display: inline-block; margin-right: 20px"
      @change="handleChange"
    />
    <t-select
      v-model="value2"
      value-type="object"
      clearable
      multiple
      placeholder="-请选择-"
      :options="options"
      style="width: 200px; display: inline-block"
      @change="handleChange"
    />
  </t-space>
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
const handleChange: SelectProps['onChange'] = (value) => {
  console.log('handleChange:', value);
};
const value = ref({
  value: '1',
  label: '选项一',
});
const value2 = ref([
  {
    value: '1',
    label: '选项一',
  },
]);
</script>

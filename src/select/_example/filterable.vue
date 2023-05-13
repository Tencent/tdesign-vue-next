<template>
  <t-space direction="vertical">
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :options="options"
      style="width: 200px; display: inline-block; margin: 0 20px 20px 0"
      filterable
      @blur="handleBlur"
      @focus="handleFocus"
      @enter="handleEnter"
    />
    <t-select
      v-model="value2"
      multiple
      placeholder="-请选择-"
      :options="options"
      :filter="filterMethod"
      style="width: 400px; display: inline-block"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </t-space>
</template>
<script setup lang="ts">
import { ref } from 'vue';

type selectOption = { label: string; value: string };

const options: selectOption[] = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: 'option4', value: '4' },
  { label: 'OPTION5', value: '5' },
];

const value = ref('');
const value2 = ref([]);

const filterMethod = (search: string, option: selectOption) => {
  console.log('filter:', search, option);
  return option.label.indexOf(search) !== -1;
};

const handleBlur = ({ value, e }: { value: selectOption[]; e: FocusEvent | KeyboardEvent }) => {
  console.log('handleBlur: ', value, e);
};

const handleFocus = ({ value, e }: { value: selectOption[]; e: FocusEvent | KeyboardEvent }) => {
  console.log('handleFocus: ', value, e);
};

const handleEnter = ({ value, e, inputValue }: { inputValue: string; e: KeyboardEvent; value: selectOption[] }) => {
  console.log('handleEnter: ', value, e, inputValue);
};
</script>

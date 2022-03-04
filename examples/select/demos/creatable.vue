<template>
  <div>
    <t-select
      v-model="value"
      creatable
      filterable
      placeholder="支持自定义创建"
      :options="options"
      style="width: 200px"
      @create="createOptions"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const value = ref('');
const options = ref([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]);

const createOptions = (val) => {
  options.value.push({
    label: `选项${val}`,
    value: val,
  });
  console.log('create option:', val);
};
</script>

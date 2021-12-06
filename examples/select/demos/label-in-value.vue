<template>
  <div>
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
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

export default defineComponent({
  setup() {
    const handleChange = (value) => {
      console.log('handleChange:', value);
    };
    const value = ref({ value: '1', label: '选项一' });
    const value2 = ref([{ value: '1', label: '选项一' }]);
    return {
      value,
      value2,
      options,
      handleChange,
    };
  },
});
</script>

<template>
  <div>
    <t-select
      :default-value="defaultValue"
      clearable
      placeholder="-请选择-"
      :on-clear="handleClear"
      style="width: 200px;"
      @change="handleChange"
    >
      <t-option
        v-for="(item, index) in options"
        :key="index"
        :value="item.value"
        :label="item.label"
      >
        {{ item.label }}
      </t-option>
    </t-select>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  {
    label: '已选择的选项',
    value: '1',
  },
  {
    label: '短的选项二',
    value: '2',
  },
  {
    label: '很长很长很很长很长很长的选项三',
    value: '3',
  },
];

export default defineComponent({
  setup() {
    const defaultValue = ref('1');

    const handleChange = (value) => {
      console.log('handleChange:', value);
    };
    const handleClear = (e) => {
      console.log('handleClear:', e);
    };

    return {
      defaultValue,
      options,
      handleChange,
      handleClear,
    };
  },
});
</script>

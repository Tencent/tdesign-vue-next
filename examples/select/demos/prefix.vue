<template>
  <div>
    <t-select v-model="value" style="width: 200px" :options="options" clearable placeholder="-请选择-">
      <template #prefixIcon>
        <t-icon name="browse" />
      </template>
    </t-select>
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
    const value = ref('');

    return {
      value,
      options,
    };
  },
});
</script>

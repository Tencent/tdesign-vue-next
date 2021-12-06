<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      disabled
      filterable
      style="width: 200px; display: inline-block; margin-right: 20px"
      :options="options"
    />
    <t-select
      v-model="value2"
      placeholder="-请选择-"
      multiple
      disabled
      style="width: 200px; display: inline-block"
      :options="options"
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
    const value = ref('');
    const value2 = ref(['shanghai', 'beijing']);
    return {
      value,
      value2,
      options,
    };
  },
});
</script>

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
  {
    label: '上海',
    value: 'shanghai',
  },
  {
    label: '北京',
    value: 'beijing',
    disabled: true,
  },
  {
    label: '深圳',
    value: 'shenzhen',
  },
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

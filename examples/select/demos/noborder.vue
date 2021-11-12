<template>
  <div>
    <t-select
      v-model="value"
      :bordered="false"
      style="width: 200px;"
      placeholder="-请选择-"
      clearable
      :options="options"
    />
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
    label: '很长很长很长的选项三',
    value: '3',
  },
]

export default defineComponent({
  setup() {
    const value = ref('1');

    return {
      value,
      options,
    }
  }
});
</script>

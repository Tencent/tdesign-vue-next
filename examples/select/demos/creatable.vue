<template>
  <div>
    <t-select
      v-model="value"
      creatable
      filterable
      placeholder="请选择，支持自定义创建"
      :options="options"
      style="width: 200px"
      @create="createOptions"
    />
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
  },
  {
    label: '深圳',
    value: 'shenzhen',
  },
];

export default defineComponent({
  setup() {
    const value = ref('');
    const value2 = ref([]);

    const createOptions = () => {
      options.value.push({
        value,
        label: value,
      });
      console.log('create option:', value);
    };

    return {
      value,
      value2,
      options,
      createOptions,
    };
  },
});
</script>

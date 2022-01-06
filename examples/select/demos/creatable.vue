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

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');
    const options = ref([
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ]);

    const createOptions = () => {
      options.value.push({
        value,
        label: value,
      });
      console.log('create option:', value);
    };

    return {
      value,
      options,
      createOptions,
    };
  },
});
</script>

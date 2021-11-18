<template>
  <div>
    <t-select
      v-model="value"
      value-type="object"
      clearable
      placeholder="-请选择-"
      :options="options"
      style="width: 200px;display: inline-block;margin-right: 20px;"
      @change="handleChange"
    />
    <t-select
      v-model="value2"
      value-type="object"
      clearable
      multiple
      placeholder="-请选择-"
      :options="options"
      style="width: 200px;display: inline-block;"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [{
  label: '上海',
  value: 'shanghai',
}, {
  label: '北京',
  value: 'beijing',
}, {
  label: '深圳',
  value: 'shenzhen',
}];

export default defineComponent({
  setup() {
    const handleChange = (value) => {
      console.log('handleChange:', value);
    };
    const value = ref({ value: 'shanghai', label: '上海' });
    const value2 = ref([{ value: 'shanghai', label: '上海' }]);
    return {
      value,
      value2,
      options,
      handleChange,
    };
  },
});
</script>

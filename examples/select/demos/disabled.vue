<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      disabled
      filterable
      style="width: 200px;display: inline-block;margin-right: 20px;"
      :options="options"
    />
    <t-select
      v-model="value2"
      placeholder="-请选择-"
      multiple
      disabled
      style="width: 200px;display: inline-block;"
      :options="options"
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
}]

export default defineComponent({
  setup() {
    const value = ref('')
    const value2 = ref(['shanghai', 'beijing']);
    return {
      value,
      value2,
      options,
    }
  }
});
</script>

<template>
  <div>
    <t-select
      v-model="value1"
      size="small"
      :popup-props="popupProps"
      placeholder="-请选择-"
      style="width: 200px; display: inline-block; margin-right: 20px"
      clearable
    >
      <t-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label">
        {{ item.label }}
      </t-option>
    </t-select>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :options="options"
      size="medium"
      style="width: 200px; display: inline-block; margin-right: 20px"
    />
    <t-select
      v-model="value2"
      placeholder="-请选择-"
      :options="options"
      size="large"
      style="width: 200px; display: inline-block"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' },
  { label: '深圳', value: 'shenzhen' },
];

export default defineComponent({
  setup() {
    const value = ref('');
    const value1 = ref('');
    const value2 = ref('');

    return {
      value,
      value1,
      value2,
      popupProps: {
        overlayStyle: {
          width: '300px',
        },
      },
      options,
    };
  },
});
</script>
<style scoped>
.demo-select-base {
  width: 200px;
  display: inline-block;
  margin: 0 20px;
}
</style>

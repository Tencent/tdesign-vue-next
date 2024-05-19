<template>
  <t-space direction="vertical">
    <t-select
      v-model="value1"
      size="small"
      :popup-props="popupProps"
      placeholder="请选择"
      style="width: 200px; display: inline-block; margin-right: 20px"
      clearable
    >
      <t-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label">
        {{ item.label }}
      </t-option>
    </t-select>
    <t-select
      v-model="value"
      placeholder="请选择"
      :options="options"
      size="medium"
      style="width: 200px; display: inline-block; margin-right: 20px"
    />
    <t-select
      v-model="value2"
      placeholder="请选择"
      :options="options"
      size="large"
      style="width: 200px; display: inline-block"
    />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

const value = ref('');
const value1 = ref('');
const value2 = ref('');
const popupProps = {
  overlayStyle: {
    width: '300px',
  },
};
</script>

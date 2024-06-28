<template>
  <t-tree-select
    v-model="value"
    :data="options"
    clearable
    placeholder="请选择"
    :popup-visible="popupVisible"
    :tree-props="{
      checkStrictly: true,
    }"
    @popup-visible-change="onVisibleChange"
  />
</template>
<script setup>
import { ref } from 'vue';

const options = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '广州市',
        value: 'guangzhou',
      },
      {
        label: '深圳市',
        value: 'shenzhen',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    disabled: true,
    children: [
      {
        label: '南京市',
        value: 'nanjing',
      },
      {
        label: '苏州市',
        value: 'suzhou',
      },
    ],
  },
];

const value = ref('');
const popupVisible = ref(false);

const onVisibleChange = (visible, context) => {
  console.log(visible, context);
  if (context.trigger || context.node?.label !== '广州市') {
    popupVisible.value = visible;
  }
};
</script>

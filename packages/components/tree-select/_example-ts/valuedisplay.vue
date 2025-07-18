<template>
  <t-space>
    <t-tree-select v-model="value" :data="options" clearable placeholder="请选择" filterable>
      <template #valueDisplay="{ value: valueDisplay }"> {{ valueDisplay.label }}({{ valueDisplay.value }}) </template>
    </t-tree-select>
    <t-tree-select v-model="mulValue" :data="options" multiple clearable filterable placeholder="请选择">
      <template #valueDisplay="{ value: valueDisplay, onClose }">
        <t-tag v-for="(item, index) in valueDisplay" :key="index" closable :on-close="() => onClose(index)">
          {{ item.label }}({{ item.value }})
        </t-tag>
      </template>
    </t-tree-select>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TreeSelectProps } from 'tdesign-vue-next';
const value = ref('shenzhen');
const mulValue = ref(['shenzhen', 'guangzhou']);
const options: TreeSelectProps['data'] = [
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
        children: [
          {
            label: '深圳市南山区海天二路33号腾讯滨海大厦',
            value: 'Tencent',
          },
        ],
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
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
</script>

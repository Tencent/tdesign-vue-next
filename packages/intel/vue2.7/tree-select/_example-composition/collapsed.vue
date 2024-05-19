<template>
  <t-space direction="vertical">
    <t-tree-select
      v-model="value"
      :data="options"
      multiple
      clearable
      placeholder="请选择"
      :minCollapsedNum="1"
      style="width: 300px"
    >
    </t-tree-select>
    <t-tree-select
      v-model="slotValue"
      style="width: 300px"
      :data="options"
      multiple
      clearable
      placeholder="请选择"
      :minCollapsedNum="1"
    >
      <template slot="collapsedItems">
        <t-tag>更多...</t-tag>
      </template>
    </t-tree-select>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const value = ref(['guangzhou', 'shenzhen']);
const slotValue = ref(['guangzhou', 'shenzhen']);
const options = ref([
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
]);
</script>

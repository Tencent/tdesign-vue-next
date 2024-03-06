<template>
  <t-space direction="vertical">
    <t-tree-select
      v-model="value"
      :data="options"
      class="demo-space"
      multiple
      clearable
      placeholder="请选择"
      :min-collapsed-num="1"
    >
    </t-tree-select>
    <t-tree-select v-model="slotValue" :data="options" multiple clearable placeholder="请选择" :min-collapsed-num="1">
      <template #collapsedItems>
        <t-tag>更多...</t-tag>
      </template>
    </t-tree-select>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TreeSelectProps } from 'tdesign-vue-next';
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
const value = ref(['guangzhou', 'shenzhen']);
const slotValue = ref(['guangzhou', 'shenzhen']);
</script>

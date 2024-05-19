<template>
  <t-space>
    <!-- 方式一：直接传 options 数据，比插槽的方式更简单 -->
    <t-select v-model="value1" :options="options" placeholder="请选择" filterable />

    <!-- 方式二：使用插槽节点 -->
    <t-select multiple v-model="value2" placeholder="请选择" filterable :style="{ minWidth: '240px' }">
      <t-option :checkAll="true">全选</t-option>
      <t-option-group
        v-for="(list, index) in options"
        :key="index"
        :label="typeof list.group === 'object' ? list.group.label : list.group"
        divider
      >
        <t-option v-for="item in list.children" :value="item.value" :label="item.label" :key="item.value">
          {{ item.label }}
        </t-option>
      </t-option-group>
    </t-select>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref([]);
const options = ref([
  {
    group: '分组一',
    children: [
      {
        label: '选项一',
        value: 1,
      },
      {
        label: '选项二',
        value: 2,
      },
    ],
  },
  {
    group: '分组二',
    children: [
      {
        label: '选项三',
        value: 4,
      },
      {
        label: '选项四',
        value: 5,
      },
      {
        label: '选项五',
        value: 6,
      },
    ],
  },
  {
    group: '分组三',
    divider: true,
    children: [
      {
        label: '选项六',
        value: 7,
      },
      {
        label: '选项七',
        value: 8,
      },
      {
        label: '选项八',
        value: 9,
      },
    ],
  },
]);
</script>

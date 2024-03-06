<template>
  <t-space direction="vertical">
    <!-- 方式一：直接传 options 数据，比插槽的方式更简单 -->
    <t-select v-model="value1" :options="options" placeholder="请选择" filterable />

    <!-- 方式二：使用插槽节点 -->
    <t-select v-model="value2" placeholder="请选择" filterable>
      <t-option-group
        v-for="(list, index) in options"
        :key="index"
        :label="typeof list.group === 'object' ? list.group.label : list.group"
        divider
      >
        <t-option v-for="item in list.children" :key="item.value" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-option-group>
    </t-select>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
interface CustomOptionInfo {
  group?:
    | string
    | {
        label: string;
      };
  divider?: boolean;
  label?: string;
  value?: number;
  children?: CustomOptionInfo[];
}
const options: CustomOptionInfo[] = [
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
];
const value1 = ref('');
const value2 = ref('');
</script>
<style scoped>
.tdesign-demo-select-base {
  width: 450px;
  display: flex;
}

.tdesign-demo-select-base .t-select__wrap + .t-select__wrap {
  margin-left: 36px;
}
</style>

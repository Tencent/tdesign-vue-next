<template>
  <t-space direction="vertical" style="width: 100%">
    <!-- 基础搜索：每个层级独立过滤 -->
    <t-cascader v-model="value" :options="options1">
      <template #popupHeader="{ panelIndex, onFilter }">
        <t-input
          v-model="searchValues1[panelIndex]"
          :placeholder="`搜索第${panelIndex + 1}级`"
          @change="(val) => onFilter(val)"
        />
      </template>
    </t-cascader>

    <!-- 级联搜索：搜索某级后，后续级别只显示匹配项的子节点 -->
    <t-cascader v-model="value2" :options="options2">
      <template #popupHeader="{ panelIndex, onFilter }">
        <t-input
          v-model="searchValues2[panelIndex]"
          :placeholder="`搜索第${panelIndex + 1}级（级联）`"
          @change="(val) => onFilter(val, { cascade: true })"
        />
      </template>
    </t-cascader>

    <!-- 基础搜索 + 底部搜索框（位置不同但功能相同） -->
    <t-cascader v-model="value3" :options="options3">
      <template #popupHeader="{ panelIndex, onFilter }">
        <t-input
          v-model="searchValues3[panelIndex]"
          :placeholder="'搜索第' + (panelIndex + 1) + '级（顶部）'"
          @change="(val) => onFilter(val)"
        />
      </template>
      <template #popupFooter="{ panelIndex, onFilter }">
        <t-input
          v-model="searchValues3[panelIndex]"
          :placeholder="'搜索第' + (panelIndex + 1) + '级（底部）'"
          @change="(val) => onFilter(val)"
        />
      </template>
    </t-cascader>

    <!-- 级联搜索 + 底部搜索框（位置不同但功能相同） -->
    <t-cascader v-model="value4" :options="options4">
      <template #popupHeader="{ panelIndex, onFilter }">
        <t-input
          v-model="searchValues4[panelIndex]"
          :placeholder="'搜索第' + (panelIndex + 1) + '级（级联-顶部）'"
          @change="(val) => onFilter(val, { cascade: true })"
        />
      </template>
      <template #popupFooter="{ panelIndex, onFilter }">
        <t-input
          v-model="searchValues4[panelIndex]"
          :placeholder="'搜索第' + (panelIndex + 1) + '级（级联-底部）'"
          @change="(val) => onFilter(val, { cascade: true })"
        />
      </template>
    </t-cascader>
  </t-space>
</template>

<script setup>
import { ref, reactive } from 'vue';

/**
 * Factory function to create options data.
 * Each Cascader instance should use its own options copy to ensure complete independence.
 * While the current implementation doesn't mutate options, using separate copies is a best practice
 * that prevents potential issues if options were ever modified.
 */
const createOptions = () => [
  {
    label: '选项一',
    value: '1',
    children: [
      {
        label: '子选项一',
        value: '1.1',
        children: [
          { label: '三级-1', value: '1.1.1' },
          { label: '三级-2', value: '1.1.2' },
        ],
      },
      {
        label: '子选项二',
        value: '1.2',
        children: [{ label: '三级-3', value: '1.2.1' }],
      },
      {
        label: '子选项三',
        value: '1.3',
      },
    ],
  },
  {
    label: '选项二',
    value: '2',
    children: [
      {
        label: '子选项一',
        value: '2.1',
        children: [{ label: '三级-4', value: '2.1.1' }],
      },
      {
        label: '子选项二',
        value: '2.2',
      },
    ],
  },
  {
    label: '选项三',
    value: '3',
    children: [
      {
        label: '子选项一',
        value: '3.1',
      },
    ],
  },
];

// Each Cascader instance has independent state: value ref, options copy, and search state
const value = ref('1.1.1');
const value2 = ref('1.1.1');
const value3 = ref('1.1.1');
const value4 = ref('1.1.1');

// Independent options for each instance (created from factory function)
const options1 = createOptions();
const options2 = createOptions();
const options3 = createOptions();
const options4 = createOptions();

// Independent search state for each instance using reactive objects
const searchValues1 = reactive({});
const searchValues2 = reactive({});
const searchValues3 = reactive({});
const searchValues4 = reactive({});
</script>

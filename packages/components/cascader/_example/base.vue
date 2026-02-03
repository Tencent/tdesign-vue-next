<template>
  <t-space direction="vertical" style="width: 100%">
    <!-- 示例1: 基础搜索 -->
    <div class="demo-item">
      <div class="demo-title">示例1: 基础搜索</div>
      <div class="demo-desc">每个层级独立过滤，输入关键词只影响当前面板</div>
      <t-cascader v-model="value" :options="options1">
        <template #panelContentTop="{ panelIndex, onFilter }">
          <t-input
            v-model="searchValues1[panelIndex]"
            :placeholder="`搜索第${panelIndex + 1}级`"
            @change="(val) => onFilter(val)"
          />
        </template>
      </t-cascader>
    </div>

    <!-- 示例2: 级联搜索 -->
    <div class="demo-item">
      <div class="demo-title">示例2: 级联搜索</div>
      <div class="demo-desc">搜索某级后，后续级别只显示匹配项的子节点（使用 cascade: true）</div>
      <t-cascader v-model="value2" :options="options2">
        <template #panelContentTop="{ panelIndex, onFilter }">
          <t-input
            v-model="searchValues2[panelIndex]"
            :placeholder="`搜索第${panelIndex + 1}级（级联）`"
            @change="(val) => onFilter(val, { cascade: true })"
          />
        </template>
      </t-cascader>
    </div>

    <!-- 示例3: 顶部 + 底部搜索框 -->
    <div class="demo-item">
      <div class="demo-title">示例3: 顶部 + 底部搜索框</div>
      <div class="demo-desc">同时使用 panelContentTop 和 panelContentBottom 两个 slot，位置不同但功能相同</div>
      <t-cascader v-model="value3" :options="options3">
        <template #panelContentTop="{ panelIndex, onFilter }">
          <t-input
            v-model="searchValues3[panelIndex]"
            :placeholder="'搜索第' + (panelIndex + 1) + '级（顶部）'"
            @change="(val) => onFilter(val)"
          />
        </template>
        <template #panelContentBottom="{ panelIndex, onFilter }">
          <t-input
            v-model="searchValues3[panelIndex]"
            :placeholder="'搜索第' + (panelIndex + 1) + '级（底部）'"
            @change="(val) => onFilter(val)"
          />
        </template>
      </t-cascader>
    </div>

    <!-- 示例4: 级联搜索 + 顶部底部搜索框 -->
    <div class="demo-item">
      <div class="demo-title">示例4: 级联搜索 + 顶部底部搜索框</div>
      <div class="demo-desc">结合级联过滤（cascade: true）与双 slot 位置</div>
      <t-cascader v-model="value4" :options="options4">
        <template #panelContentTop="{ panelIndex, onFilter }">
          <t-input
            v-model="searchValues4[panelIndex]"
            :placeholder="'搜索第' + (panelIndex + 1) + '级（级联-顶部）'"
            @change="(val) => onFilter(val, { cascade: true })"
          />
        </template>
        <template #panelContentBottom="{ panelIndex, onFilter }">
          <t-input
            v-model="searchValues4[panelIndex]"
            :placeholder="'搜索第' + (panelIndex + 1) + '级（级联-底部）'"
            @change="(val) => onFilter(val, { cascade: true })"
          />
        </template>
      </t-cascader>
    </div>
  </t-space>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 创建选项数据
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

// 各实例独立的选中值
const value = ref('1.1.1');
const value2 = ref('1.1.1');
const value3 = ref('1.1.1');
const value4 = ref('1.1.1');

// 各实例独立的选项数据
const options1 = createOptions();
const options2 = createOptions();
const options3 = createOptions();
const options4 = createOptions();

// 各实例独立的搜索状态
const searchValues1 = reactive({});
const searchValues2 = reactive({});
const searchValues3 = reactive({});
const searchValues4 = reactive({});
</script>

<style scoped>
.demo-item {
  margin-bottom: 16px;
}

.demo-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.demo-desc {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}
</style>

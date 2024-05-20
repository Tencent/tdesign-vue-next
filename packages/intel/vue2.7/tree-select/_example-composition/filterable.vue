<template>
  <t-space direction="vertical">
    <t-radio-group v-model="type" variant="default-filled">
      <t-radio-button value="filterable">默认过滤规则</t-radio-button>
      <t-radio-button value="filter">自定义过滤规则</t-radio-button>
      <t-radio-button value="search">远程搜索</t-radio-button>
    </t-radio-group>
    <t-radio-group v-model="multiple" variant="default-filled">
      <t-radio-button :value="true">多选</t-radio-button>
      <t-radio-button :value="false">单选</t-radio-button>
    </t-radio-group>

    <template v-if="multiple">
      <!-- 多选：默认过滤规则 -->
      <t-tree-select
        v-if="type === 'filterable'"
        v-model="multipleValue1"
        :data="options"
        multiple
        clearable
        filterable
        placeholder="请选择"
        style="width: 500px"
      ></t-tree-select>

      <!-- 多选：自定义过滤规则 -->
      <t-tree-select
        v-else-if="type === 'filter'"
        v-model="multipleValue2"
        :data="options"
        multiple
        clearable
        :filter="filterFunction"
        :treeProps="{ expandAll: true, valueMode: 'onlyLeaf' }"
        placeholder="请选择"
        style="width: 500px"
      ></t-tree-select>

      <!-- 多选：远程搜索 -->
      <!-- :loadingText="loadingText" -->
      <t-tree-select
        v-else
        v-model="multipleValue3"
        :data="options"
        multiple
        clearable
        placeholder="请选择"
        style="width: 500px"
        :popupVisible="true"
        :loading="loading"
        :treeProps="{ expandAll: true, valueMode: 'onlyLeaf' }"
        @search="onMultipleRemoteSearch"
      ></t-tree-select>
    </template>

    <template v-else>
      <!-- 单选：默认过滤规则 -->
      <t-tree-select
        v-if="type === 'filterable'"
        v-model="singleValue1"
        :data="options"
        :treeProps="{ expandAll: true, valueMode: 'onlyLeaf' }"
        clearable
        filterable
        placeholder="请选择"
        style="width: 300px"
        @focus="onFocus"
      ></t-tree-select>

      <!-- 单选：自定义过滤规则 -->
      <t-tree-select
        v-else-if="type === 'filter'"
        v-model="singleValue2"
        :data="options"
        clearable
        :filter="filterFunction"
        :treeProps="{ expandAll: true, valueMode: 'onlyLeaf' }"
        placeholder="请选择"
        style="width: 300px"
      ></t-tree-select>

      <!-- 单选：远程搜索 -->
      <!-- :loadingText="loadingText" -->
      <t-tree-select
        v-else
        v-model="singleValue3"
        :data="options"
        clearable
        placeholder="请选择"
        style="width: 500px"
        :loading="loading"
        :treeProps="{ expandAll: true, valueMode: 'onlyLeaf' }"
        @search="onMultipleRemoteSearch"
      ></t-tree-select>
    </template>
  </t-space>
</template>
<script setup lang="jsx">
import { ref } from 'vue';

const OPTIONS = [
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
const multiple = ref(true);
const multipleValue1 = ref([]);
const multipleValue2 = ref([]);
const multipleValue3 = ref([]);
const loading = ref(false);
const singleValue1 = ref('');
const singleValue2 = ref('');
const singleValue3 = ref('');
const type = ref('filterable');
const options = ref(OPTIONS);
const filterFunction = (searchText, node) => node.data.label.indexOf(searchText) >= 0;
const onMultipleRemoteSearch = (keyword) => {
  if (!keyword) {
    options.value = OPTIONS;
    return;
  }
  console.log('search', keyword);
  loading.value = true;
  const timer = setTimeout(() => {
    options.value = [
      {
        label: `搜索结果一：${keyword}`,
        value: `${keyword}1`,
      },
      {
        label: `搜索结果二：${keyword}`,
        value: `${keyword}2`,
      },
    ];
    loading.value = false;
    clearTimeout(timer);
  }, 300);
};
// eslint-disable-next-line
// const loadingText = h => {
//   return <div>123</div>;
// };
const onFocus = () => {
  console.log('focus');
};
</script>

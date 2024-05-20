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
<script lang="jsx">
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
export default {
  data() {
    return {
      multiple: true,
      multipleValue1: [],
      multipleValue2: [],
      multipleValue3: [],
      loading: false,
      singleValue1: '',
      singleValue2: '',
      singleValue3: '',
      type: 'filterable',
      options: OPTIONS,
    };
  },

  methods: {
    filterFunction(searchText, node) {
      return node.data.label.indexOf(searchText) >= 0;
    },
    onMultipleRemoteSearch(keyword) {
      if (!keyword) {
        this.options = OPTIONS;
        return;
      }
      console.log('search', keyword);
      this.loading = true;
      const timer = setTimeout(() => {
        this.options = [
          { label: `搜索结果一：${keyword}`, value: `${keyword}1` },
          { label: `搜索结果二：${keyword}`, value: `${keyword}2` },
        ];
        this.loading = false;
        clearTimeout(timer);
      }, 300);
    },
    // eslint-disable-next-line
    // loadingText(h) {
    //   return <div>123</div>;
    // },
    onFocus() {
      console.log('focus');
    },
  },
};
</script>

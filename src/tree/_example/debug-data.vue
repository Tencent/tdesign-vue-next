<template>
  <t-space :size="32" direction="vertical" class="tdesign-tree-demo">
    <t-space :size="10" direction="vertical">
      <h3 class="title">数据切换</h3>
      <t-form label-width="150">
        <t-form-item label="切换数据">
          <t-switch @change="toggleData" />
        </t-form-item>
        <t-form-item label="默认展开全部">
          <t-switch v-model="expandAll" />
        </t-form-item>
        <t-form-item label="可选">
          <t-switch v-model="checkable" />
        </t-form-item>
        <t-form-item label="节点可高亮">
          <t-switch v-model="activable" />
        </t-form-item>
        <t-form-item label="展开动画">
          <t-switch v-model="transition" />
        </t-form-item>
      </t-form>
      <t-tree
        :data="items"
        hover
        :expand-all="expandAll"
        :transition="transition"
        :activable="activable"
        :checkable="checkable"
        :label="label"
      />
    </t-space>
  </t-space>
</template>

<script>
const data1 = [
  {
    value: 't1',
    children: [
      {
        value: 't1.1',
        children: [
          {
            value: 't1.1.1',
          },
          {
            value: 't1.1.2',
          },
        ],
      },
      {
        value: 't1.2',
        children: [
          {
            value: '1.2.1',
          },
          {
            value: '1.2.2',
          },
        ],
      },
    ],
  },
  {
    value: 't2',
    children: [
      {
        value: 't2.1',
      },
      {
        value: 't2.2',
      },
    ],
  },
];

const data2 = [
  {
    value: 'd1',
    children: [
      {
        value: 'd1.1',
        label: 'd1.1 custom label',
        children: [
          {
            value: 'd1.1.1',
          },
        ],
      },
      {
        value: 'd1.2',
        children: [
          {
            value: 'd1.2.1',
          },
          {
            value: 'd1.2.2',
          },
        ],
      },
    ],
  },
  {
    value: 'd2',
    children: [
      {
        value: 'd2.1',
      },
      {
        value: 'd2.2',
      },
    ],
  },
];

export default {
  data() {
    return {
      expandAll: true,
      activable: true,
      checkable: true,
      transition: true,
      items: data1,
    };
  },
  methods: {
    toggleData() {
      const items = this.items[0].value === 't1' ? data2 : data1;
      this.items = items;
    },
    label(createElement, node) {
      return node.label || node.value;
    },
  },
};
</script>

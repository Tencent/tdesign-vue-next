<template>
  <t-space :size="32" direction="vertical" class="tdesign-tree-demo">
    <t-space :size="10" direction="vertical">
      <t-form label-align="left" :label-width="80" style="max-width: 500px">
        <t-form-item label="展开动画">
          <t-switch v-model="transition" />
        </t-form-item>
        <t-form-item label="显示连线">
          <t-switch v-model="showLine" />
        </t-form-item>
        <t-form-item label="显示图标">
          <t-switch v-model="showIcon" />
        </t-form-item>
      </t-form>
      <t-tree
        :data="items"
        hover
        activable
        checkable
        :transition="transition"
        :expand-on-click-node="false"
        :line="showLine"
        :icon="showIcon"
        :label="label"
      ></t-tree>
    </t-space>
  </t-space>
</template>

<script>
const items = [
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
            value: 't1.2.1',
          },
          {
            value: 't1.2.2',
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
  {
    value: 't3',
    children: [
      {
        value: 't3.1',
      },
      {
        value: 't3.2',
      },
    ],
  },
];

export default {
  data() {
    return {
      index: 0,
      transition: true,
      showLine: true,
      showIcon: true,
      items,
    };
  },
  methods: {
    label(createElement, node) {
      return `${node.value}`;
    },
  },
};
</script>

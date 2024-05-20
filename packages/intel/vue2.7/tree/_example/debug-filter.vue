<template>
  <t-space direction="vertical">
    <t-space>
      <t-input-adornment prepend="filter:">
        <t-input v-model="filterText" @change="onInput" />
      </t-input-adornment>
    </t-space>
    <t-space>
      <span>允许折叠:</span>
      <t-switch v-model="allowFoldNodeOnFilter" />
    </t-space>
    <t-space>
      <span>可选:</span>
      <t-switch v-model="isCheckable" />
    </t-space>
    <t-tree
      ref="tree"
      :data="items"
      expand-on-click-node
      :allow-fold-node-on-filter="allowFoldNodeOnFilter"
      :default-expanded="expanded"
      :filter="filterByText"
      :checkable="isCheckable"
      hover
      line
    />
  </t-space>
</template>

<script>
const exampleItems = [
  {
    value: '1',
    label: '1',
    children: [
      {
        value: '1.1',
        label: '1.1',
        children: [
          {
            value: '1.1.1',
            label: '1.1.1',
            children: [
              {
                value: '1.1.1.1',
                label: '1.1.1.1',
              },
              {
                value: '1.1.1.2',
                label: '1.1.1.2',
              },
            ],
          },
          {
            value: '1.1.2',
            label: '1.1.2',
            children: [
              {
                value: '1.1.2.1',
                label: '1.1.2.1',
              },
              {
                value: '1.1.2.2',
                label: '1.1.2.2',
              },
            ],
          },
        ],
      },
      {
        value: '1.2',
        label: '1.2',
        children: [
          {
            value: '1.2.1',
            label: '1.2.1',
            children: [
              {
                value: '1.2.1.1',
                label: '1.2.1.1',
              },
              {
                value: '1.2.1.2',
                label: '1.2.1.2',
              },
            ],
          },
          {
            value: '1.2.2',
            label: '1.2.2',
            children: [
              {
                value: '1.2.2.1',
                label: '1.2.2.1',
              },
              {
                value: '1.2.2.2',
                label: '1.2.2.2',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: '2',
    children: [
      {
        value: '2.1',
        label: '2.1',
      },
      {
        value: '2.2',
        label: '2.2',
      },
    ],
  },
];

export default {
  data() {
    return {
      isCheckable: false,
      filterText: '',
      filterByText: null,
      expanded: ['1.1.1'],
      allowFoldNodeOnFilter: false,
      items: exampleItems,
    };
  },
  methods: {
    onInput(state) {
      console.info('onInput:', state);
      if (this.filterText) {
        // 存在过滤文案，才启用过滤
        this.filterByText = (node) => {
          const rs = node.data.label.indexOf(this.filterText) >= 0;
          // 命中的节点会强制展示
          // 命中节点的路径节点会锁定展示
          // 未命中的节点会隐藏
          return rs;
        };
      } else {
        // 过滤文案为空，则还原 tree 为无过滤状态
        this.filterByText = null;
      }
    },
  },
};
</script>

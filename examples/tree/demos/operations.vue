<template>
  <div class="tdesign-tree-operations">
    <h3 class="title">render:</h3>
    <t-tree
      :data="items"
      :hover="true"
      :expand-all="true"
      :label="getLabel"
      :operations="renderOperations"
    />
    <h3 class="title">scope slot:</h3>
    <t-tree
      :data="items"
      :hover="true"
      :expand-all="true"
      :label="getLabel"
      :activable="true"
      :checkable="true"
      :expand-on-click-node="false"
      ref="tree"
    >
      <template slot="operations" slot-scope="{node}">
        <t-button size="small" theme="primary" @click="append(node)">添加子节点</t-button>
        <t-button size="small" theme="line" @click="insertBefore(node)">前插节点</t-button>
        <t-button size="small" theme="line" @click="insertAfter(node)">后插节点</t-button>
        <t-button size="small" theme="line" @click="appendTo(node)">插入高亮</t-button>
        <t-button size="small" theme="warning" @click="remove(node)">删除</t-button>
      </template>
    </t-tree>
    <h3 class="title">api:</h3>
    <div class="operations">
      <t-button theme="primary" @click="getItem">获取 value 为 'node1' 的单个节点</t-button>
      <t-button theme="primary" @click="getAllItems">获取所有节点</t-button>
      <t-button theme="primary" @click="getItems">获取高亮节点下的所有节点</t-button>
      <t-button theme="primary" @click="getActived">获取所有高亮节点</t-button>
      <t-button theme="primary" @click="getChecked">获取高亮节点下的选中节点</t-button>
      <t-button theme="primary" @click="append">插入一个根节点</t-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{
        value: 'node1',
      }, {
        value: 'node2',
      }],
    };
  },
  methods: {
    renderOperations(createElement, node) {
      return `value: ${node.value}`;
    },
    getLabel(createElement, node) {
      const pathNodes = node.getPath();
      let label = pathNodes
        .map(itemNode => (itemNode.getIndex() + 1))
        .join('.');
      label = `${label} | value: ${node.value}`;
      return label;
    },
    getItem() {
      const { tree } = this.$refs;
      const node = tree.getItem('node1');
      console.log('getItem:', node);
    },
    getAllItems() {
      const { tree } = this.$refs;
      const nodes = tree.getItems();
      console.log('getItem:', nodes.map(node => node.value));
    },
    getItems() {
      const { tree } = this.$refs;
      const activedNodes = tree.getActived();
      const [node] = activedNodes;
      let nodes = [];
      if (node) {
        nodes = tree.getItems(node);
      }
      console.log('getItem:', nodes.map(node => node.value));
    },
    getActived() {
      const { tree } = this.$refs;
      const nodes = tree.getActived();
      console.log('getActived:', nodes.map(node => node.value));
    },
    getChecked() {
      const { tree } = this.$refs;
      const activedNodes = tree.getActived();
      const [node] = activedNodes;
      const nodes = tree.getChecked(node);
      console.log('getChecked:', nodes.map(node => node.value));
    },
    append(node) {
      const { tree } = this.$refs;
      if (!node) {
        tree.append({});
      } else {
        tree.append(node, {});
      }
    },
    insertBefore(node) {
      const { tree } = this.$refs;
      tree.insertBefore(node, {});
    },
    insertAfter(node) {
      const { tree } = this.$refs;
      tree.insertAfter(node, {});
    },
    appendTo(parent) {
      const { tree } = this.$refs;
      const nodes = tree.getActived();
      const [node] = nodes;
      if (node) {
        tree.remove(node);
        tree.append(parent, node);
      }
    },
    remove(node) {
      const { tree } = this.$refs;
      tree.remove(node);
    },
  },
};
</script>
<style scoped>
  .demo-tree-operations {
    display: block;
  }
  .demo-tree-operations .title{
    margin-top: 10px;
    font-weight: bold;
  }
  .demo-tree-operations .operations .t-button{
    margin: 0 10px 10px 0;
  }
  .demo-tree-operations .t-tree__operations .t-button{
    margin-left: 10px;
  }
</style>

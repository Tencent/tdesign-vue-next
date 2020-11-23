<template>
  <div class="tdesign-tree-operations">
    <h3>render:</h3>
    <t-tree
      :data="items"
      :hover="true"
      :expand-all="true"
      :label="getLabel"
      :operations="renderOperations"
    />
    <h3>scope slot:</h3>
    <t-tree
      :data="items"
      :hover="true"
      :expand-all="true"
      :label="getLabel"
      ref="tree"
    >
      <template slot="operations" slot-scope="{node}">
        <t-button size="small" theme="primary" @click="append(node)">添加子节点</t-button>
        <t-button size="small" theme="line" @click="insert(node)">插入同级节点</t-button>
        <t-button size="small" theme="warning" @click="remove(node)">删除</t-button>
      </template>
    </t-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{
      }, {
      }],
    };
  },
  methods: {
    renderOperations(createElement, node) {
      return `value: ${node.value}`;
    },
    getLabel(createElement, node) {
      const pathNodes = node.getPath();
      const label = pathNodes
        .map(itemNode => (itemNode.getIndex() + 1))
        .join('.');
      return label;
    },
    append() {
      this.$refs.tree.append();
    },
    insert() {
      this.$refs.tree.insert();
    },
    remove() {
      this.$refs.tree.remove();
    },
  },
};
</script>
<style scoped>
  .demo-tree-operations {
    display: block;
  }
  .demo-tree-operations .t-tree__operations .t-button{
    margin-left: 10px;
  }
</style>

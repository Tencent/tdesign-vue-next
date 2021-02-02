<template>
  <div class="tdesign-tree-operations">
    <h3 class="title">render:</h3>
    <t-tree
      :data="items"
      hover
      expand-all
      :label="getLabel"
      :operations="renderOperations"
    />
    <h3 class="title">scope slot:</h3>
    <div class="operations">
      <t-button :variant="btnSetActivedVariant" @click="setUseActived">插入节点使用高亮节点</t-button>
      <t-button :variant="expandParent ? 'base' : 'outline'"  @click="toggleExpandParent">子节点展开触发父节点展开</t-button>
    </div>
    <div class="operations">
      <t-addon prepend="filter:">
        <t-input v-model="filterText" @input="onInput"/>
      </t-addon>
    </div>
    <t-tree
      :data="items"
      hover
      expand-all
      activable
      checkable
      :expand-on-click-node="false"
      :label="getLabel"
      :expand-parent="expandParent"
      @expand="onExpand"
      @change="onChange"
      @active="onActive"
      line
      ref="tree"
    >
      <template #operations="{node}">
        <t-button size="small" variant="base" @click="append(node)">添加子节点</t-button>
        <t-button size="small" variant="outline" @click="insertBefore(node)">前插节点</t-button>
        <t-button size="small" variant="outline" @click="insertAfter(node)">后插节点</t-button>
        <t-button size="small" variant="base" theme="danger" @click="remove(node)">删除</t-button>
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
      <t-button theme="primary" @click="getParent">获取高亮节点的父节点</t-button>
      <t-button theme="primary" @click="getParents">获取高亮节点的所有父节点</t-button>
      <t-button theme="primary" @click="getIndex">获取高亮节点在子节点中的位置</t-button>
      <t-button theme="primary" @click="setChecked">选中高亮节点</t-button>
      <t-button theme="primary" @click="setExpanded">展开高亮节点</t-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      useActived: false,
      expandParent: true,
      filterText: '',
      items: [{
        value: 'node1',
      }, {
        value: 'node2',
      }],
    };
  },
  computed: {
    btnSetActivedVariant() {
      let variant = 'outline';
      if (this.useActived) {
        variant = 'base';
      }
      return variant;
    },
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
      const node = this.getActivedNode();
      let nodes = [];
      if (node) {
        nodes = tree.getItems(node);
      }
      console.log('getItem:', nodes.map(node => node.value));
    },
    getActived() {
      const { tree } = this.$refs;
      const nodes = tree.getActived();
      console.log('getActived value:', nodes.map(node => node.value));
      console.log('getActived:', nodes);
    },
    getChecked() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      const nodes = tree.getChecked(node);
      console.log('getChecked:', nodes.map(node => node.value));
    },
    getActivedNode() {
      const { tree } = this.$refs;
      const activedNodes = tree.getActived();
      const [activeNode] = activedNodes;
      return activeNode;
    },
    getInsertItem() {
      let item = {};
      if (this.useActived) {
        item = this.getActivedNode();
      }
      return item;
    },
    append(node) {
      const { tree } = this.$refs;
      const item = this.getInsertItem();
      if (!node) {
        tree.append(item);
      } else {
        tree.append(node, item);
      }
    },
    insertBefore(node) {
      const { tree } = this.$refs;
      const item = this.getInsertItem();
      console.log('insertBefore:', item);
      tree.insertBefore(node, item);
    },
    insertAfter(node) {
      const { tree } = this.$refs;
      const item = this.getInsertItem();
      tree.insertAfter(node, item);
    },
    setUseActived() {
      this.useActived = !this.useActived;
    },
    getParent() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      const parent = tree.getParent(node);
      console.log('getParent', parent?.value);
    },
    getParents() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      const parents = tree.getParents(node);
      console.log('getParents', parents.map(node => node.value));
    },
    setChecked() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      tree.setItem(node, {
        checked: true,
      });
    },
    setExpanded() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      tree.setItem(node, {
        expanded: true,
      });
    },
    getIndex() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      const index = tree.getIndex(node);
      console.log('getIndex', index);
    },
    remove(node) {
      const { tree } = this.$refs;
      tree.remove(node);
    },
    toggleExpandParent() {
      this.expandParent = !this.expandParent;
    },
    onChange(vals, state) {
      console.log('on change:', vals, state);
    },
    onExpand(vals, state) {
      console.log('on expand:', vals, state);
    },
    onActive(vals, state) {
      console.log('on active:', vals, state);
    },
    onInput(state) {
      console.log('on input:', state);
      const { tree } = this.$refs;
      const filterFn = (node) => {
        const rs = node.label.indexOf(this.filterText) >= 0;
        return rs;
      };
      tree.filterItems(filterFn);
    },
  },
};
</script>
<style>
  .tdesign-tree-operations .title{
    margin-top: 10px;
    font-weight: bold;
  }
  .tdesign-tree-operations .operations .t-button{
    margin: 0 10px 10px 0;
  }
  .tdesign-tree-operations .t-tree__operations .t-button{
    margin-left: 10px;
  }
</style>

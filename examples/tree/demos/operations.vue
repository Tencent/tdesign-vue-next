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
      <t-form labelWidth="200">
        <t-form-item label="插入节点使用高亮节点">
          <t-switch v-model="useActived"/>
        </t-form-item>
        <t-form-item label="子节点展开触发父节点展开">
          <t-switch v-model="expandParent"/>
        </t-form-item>
      </t-form>
    </div>
    <div class="operations">
      <t-addon prepend="filter:">
        <t-input v-model="filterText" @change="onInputChange"/>
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
      :filter="filterByText"
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
      <t-button theme="primary" @click="getActiveChildren">获取高亮节点的所有子节点</t-button>
      <t-button theme="primary" @click="getAllActived">获取所有高亮节点</t-button>
      <t-button theme="primary" @click="getActiveChecked">获取高亮节点下的选中节点</t-button>
      <t-button theme="primary" @click="append()">插入一个根节点</t-button>
      <t-button theme="primary" @click="getActiveParent">获取高亮节点的父节点</t-button>
      <t-button theme="primary" @click="getActiveParents">获取高亮节点的所有父节点</t-button>
      <t-button theme="primary" @click="getActiveIndex">获取高亮节点在子节点中的位置</t-button>
      <t-button theme="primary" @click="setActiveChecked">选中高亮节点</t-button>
      <t-button theme="primary" @click="setActiveExpanded">展开高亮节点</t-button>
      <t-button theme="primary" @click="getActivePlainData">获取高亮节点与其子节点的数据</t-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 2,
      activeId: '',
      activeIds: [],
      expandIds: [],
      checkedIds: [],
      useActived: false,
      expandParent: true,
      filterText: '',
      filterByText: null,
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
    getLabelContent(node) {
      const pathNodes = node.getPath();
      let label = pathNodes
        .map((itemNode) => (itemNode.getIndex() + 1))
        .join('.');
      label = `${label} | value: ${node.value}`;
      return label;
    },
    getLabel(createElement, node) {
      const label = this.getLabelContent(node);
      const { data } = node;
      data.label = label;
      return label;
    },
    setLabel(value) {
      const { tree } = this.$refs;
      const node = tree.getItem(value);
      const label = this.getLabelContent(node);
      const { data } = node;
      data.label = label;
    },
    getItem() {
      const { tree } = this.$refs;
      const node = tree.getItem('node1');
      console.info('getItem:', node.label);
    },
    getAllItems() {
      const { tree } = this.$refs;
      const nodes = tree.getItems();
      console.info('getAllItems:', nodes.map((node) => node.value));
    },
    getActiveChildren() {
      const node = this.getActivedNode();
      if (!node) return;
      let nodes = [];
      if (node) {
        nodes = node.getChildren(true) || [];
      }
      console.info('getActiveChildren:', nodes.map((node) => node.value));
    },
    getAllActived() {
      console.info('getActived value:', this.activeIds.slice(0));
    },
    getActiveChecked() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      if (!node) return;
      const nodes = tree.getItems(node.value);
      console.info(
        'getChecked:',
        nodes
          .filter((node) => node.checked)
          .map((node) => node.value),
      );
    },
    getActivedNode() {
      const { tree } = this.$refs;
      const { activeId } = this;
      const activeNode = tree.getItem(activeId);
      return activeNode;
    },
    getInsertItem() {
      let item = null;
      if (this.useActived) {
        item = this.getActivedNode();
      } else {
        this.index += 1;
        const value = `t${this.index}`;
        item = {
          value,
        };
      }
      return item;
    },
    getPlainData(item) {
      const root = item;
      if (!root) return null;
      const children = item.getChildren(true) || [];
      const list = [root].concat(children);
      const nodeMap = {};
      const nodeList = list.map((item) => {
        const node = {
          walkData() {
            const data = {
              ...this.data,
            };
            const itemChildren = this.getChildren();
            if (Array.isArray(itemChildren)) {
              data.children = [];
              itemChildren.forEach((childItem) => {
                const childNode = nodeMap[childItem.value];
                const childData = childNode.walkData();
                data.children.push(childData);
              });
            }
            return data;
          },
          ...item,
        };
        nodeMap[item.value] = node;
        return node;
      });
      const [rootNode] = nodeList;
      const data = rootNode.walkData();
      return data;
    },
    append(node) {
      const { tree } = this.$refs;
      const item = this.getInsertItem();
      if (item) {
        if (!node) {
          tree.appendTo('', item);
        } else {
          tree.appendTo(node.value, item);
        }
        this.setLabel(item.value);
      }
    },
    insertBefore(node) {
      const { tree } = this.$refs;
      const item = this.getInsertItem();
      if (item) {
        tree.insertBefore(node.value, item);
        this.setLabel(item.value);
      }
    },
    insertAfter(node) {
      const { tree } = this.$refs;
      const item = this.getInsertItem();
      if (item) {
        tree.insertAfter(node.value, item);
        this.setLabel(item.value);
      }
    },
    setUseActived() {
      this.useActived = !this.useActived;
    },
    getActiveParent() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      if (!node) return;
      const parent = tree.getParent(node.value);
      console.info('getParent', parent?.value);
    },
    getActiveParents() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      if (!node) return;
      const parents = tree.getParents(node.value);
      console.info('getParents', parents.map((node) => node.value));
    },
    setActiveChecked() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      if (!node) return;
      tree.setItem(node?.value, {
        checked: true,
      });
    },
    setActiveExpanded() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      if (!node) return;
      tree.setItem(node?.value, {
        expanded: true,
      });
    },
    getActiveIndex() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      if (!node) return;
      const index = tree.getIndex(node.value);
      console.info('getIndex', index);
    },
    getActivePlainData() {
      const node = this.getActivedNode();
      if (!node) return;
      const data = this.getPlainData(node);
      return data;
    },
    remove(node) {
      const { tree } = this.$refs;
      tree.remove(node.value);
    },
    toggleExpandParent() {
      this.expandParent = !this.expandParent;
    },
    onChange(vals, state) {
      console.info('on change:', vals, state);
      this.checkedIds = vals;
    },
    onExpand(vals, state) {
      console.info('on expand:', vals, state);
      this.expandIds = vals;
    },
    onActive(vals, state) {
      console.info('on active:', vals, state);
      this.activeIds = vals;
      this.activeId = vals[0] || '';
    },
    onInputChange(state) {
      console.info('on input:', state);
      this.filterByText = (node) => {
        const label = node?.data?.label || '';
        const rs = label.indexOf(this.filterText) >= 0;
        return rs;
      };
    },
  },
};
</script>
<style>
.tdesign-tree-operations .title{
  margin: 10px 0;
  font-weight: bold;
}
.tdesign-tree-operations .operations .t-button{
  margin: 0 10px 10px 0;
}
.tdesign-tree-operations .t-tree__operations .t-button{
  margin-left: 10px;
}
</style>

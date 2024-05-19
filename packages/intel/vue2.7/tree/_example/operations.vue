<template>
  <t-space direction="vertical" style="width: 100%" class="tdesign-tree-operations">
    <t-space>
      <span>插入节点使用高亮节点:</span>
      <t-switch v-model="useActived" />
    </t-space>
    <t-space>
      <span>子节点展开触发父节点展开:</span>
      <t-switch v-model="expandParent" />
    </t-space>
    <t-space>
      <t-input-adornment prepend="filter:">
        <t-input v-model="filterText" @change="onInputChange" />
      </t-input-adornment>
    </t-space>
    <t-tree
      ref="tree"
      :data="items"
      hover
      expand-all
      activable
      checkable
      :expand-on-click-node="false"
      :label="getLabel"
      :expand-parent="expandParent"
      :filter="filterByText"
      line
      @expand="onExpand"
      @change="onChange"
      @active="onActive"
    >
      <template #operations="{ node }">
        <t-space :size="10">
          <t-button size="small" variant="base" @click="append(node)">添加子节点</t-button>
          <t-button size="small" variant="outline" @click="insertBefore(node)">前插节点</t-button>
          <t-button size="small" variant="outline" @click="insertAfter(node)">后插节点</t-button>
          <t-button
            size="small"
            :theme="node.disabled ? 'success' : 'warning'"
            variant="base"
            @click="toggleDisable(node)"
          >
            {{ node.disabled ? 'enable' : 'disable' }}
          </t-button>
          <t-button size="small" variant="base" theme="danger" @click="remove(node)">删除</t-button>
        </t-space>
      </template>
    </t-tree>
    <h3>操作树节点</h3>
    <t-space :size="10" break-line>
      <t-button theme="primary" variant="outline" @click="getItem">获取 value 为 'node1' 的单个节点</t-button>
      <t-button theme="primary" variant="outline" @click="getAllItems">获取所有节点</t-button>
      <t-button theme="primary" variant="outline" @click="getActiveChildren">获取高亮节点的所有子节点</t-button>
      <t-button theme="primary" variant="outline" @click="getAllActived">获取所有高亮节点</t-button>
      <t-button theme="primary" variant="outline" @click="getActiveChecked">获取高亮节点下的选中节点</t-button>
      <t-button theme="primary" variant="outline" @click="append()">插入一个根节点</t-button>
      <t-button theme="primary" variant="outline" @click="getActiveParent">获取高亮节点的父节点</t-button>
      <t-button theme="primary" variant="outline" @click="getActiveParents">获取高亮节点的所有父节点</t-button>
      <t-button theme="primary" variant="outline" @click="getActiveIndex">获取高亮节点在子节点中的位置</t-button>
      <t-button theme="primary" variant="outline" @click="setActiveChecked">选中高亮节点</t-button>
      <t-button theme="primary" variant="outline" @click="setActiveUnChecked">取消选中高亮节点</t-button>
      <t-button theme="primary" variant="outline" @click="setActiveExpanded">展开高亮节点</t-button>
      <t-button theme="primary" variant="outline" @click="getActivePlainData">获取高亮节点与其子节点的数据</t-button>
    </t-space>
    <div>* 相关信息通过控制台输出</div>
  </t-space>
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
      items: [
        {
          value: 'node1',
        },
        {
          value: 'node2',
        },
      ],
    };
  },
  methods: {
    getLabelContent(node) {
      const pathNodes = node.getPath();
      let label = pathNodes.map((itemNode) => itemNode.getIndex() + 1).join('.');
      label = `${label} | value: ${node.value}`;
      return label;
    },
    getLabel(h, node) {
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
      console.info('getItem:', node.value);
    },
    getAllItems() {
      const { tree } = this.$refs;
      const nodes = tree.getItems();
      console.info(
        'getAllItems:',
        nodes.map((node) => node.value),
      );
    },
    getActiveChildren() {
      const node = this.getActivedNode();
      if (!node) return;
      let nodes = [];
      if (node) {
        nodes = node.getChildren(true) || [];
      }
      console.info(
        'getActiveChildren:',
        nodes.map((node) => node.value),
      );
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
        nodes.filter((node) => node.checked).map((node) => node.value),
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
      if (this.useActived) {
        this.activeId = '';
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
      console.info(
        'getParents',
        parents.map((node) => node.value),
      );
    },
    setActiveChecked() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      if (!node) return;
      tree.setItem(node?.value, {
        checked: true,
      });
    },
    setActiveUnChecked() {
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      if (!node) return;
      tree.setItem(node?.value, {
        checked: false,
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
      const { tree } = this.$refs;
      const node = this.getActivedNode();
      let treeNodes = [];
      if (!node) {
        treeNodes = tree.getTreeData();
      } else {
        treeNodes = tree.getTreeData(node.value);
      }
      console.info('树结构数据:', treeNodes);
    },
    toggleDisable(node) {
      const { tree } = this.$refs;
      tree.setItem(node.value, {
        disabled: !node.disabled,
      });
    },
    remove(node) {
      const { tree } = this.$refs;
      tree.remove(node.value);
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
      if (this.filterText) {
        this.filterByText = (node) => {
          const label = node?.data?.label || '';
          const rs = label.indexOf(this.filterText) >= 0;
          return rs;
        };
      } else {
        this.filterByText = null;
      }
    },
  },
};
</script>
<style>
.tdesign-tree-operations .t-is-active .t-tree__label,
.tdesign-tree-operations .t-is-active .t-checkbox__label {
  background-color: rgba(255, 0, 0, 0.3);
}
.tdesign-tree-operations .tips p {
  line-height: 24px;
  text-indent: 1em;
}
</style>

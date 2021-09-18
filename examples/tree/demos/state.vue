<template>
  <div class="tdesign-tree-state">
    <h3 class="title">state:</h3>
    <t-tree
      :data="items"
      hover
      expand-all
      activable
      checkable
      :expand-on-click-node="false"
      line
      :icon="icon"
      ref="tree"
    >
      <template #operations="{node}">
        <t-button size="small" variant="base" @click="check(node)">检查节点信息</t-button>
        <t-button size="small" variant="base" @click="changeIcon(node)">变更图标</t-button>
        <t-button size="small" variant="base" @click="append(node)">添加子节点</t-button>
        <t-button size="small" variant="base" theme="danger" @click="remove(node)">删除</t-button>
      </template>
    </t-tree>
    <h3 class="title">api:</h3>
    <div class="operations">
      <t-button theme="primary" @click="append()">插入一个根节点</t-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 2,
      useActived: false,
      expandParent: true,
      filterText: '',
      filterByText: null,
      // icon 要先预置到节点中，才能触发视图更新
      items: [{
        icon: '',
        label: 'node1',
        value: 'node1',
      }, {
        icon: '',
        label: 'node2',
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
    icon(createElement, node) {
      const { data } = node;
      let name = 'file';
      if (node.getChildren()) {
        if (node.expanded) {
          name = 'folder-open';
        } else {
          name = 'folder';
        }
      }
      if (data.icon) {
        name = data.icon;
      }
      return createElement('t-icon', {
        props: {
          name,
        },
      });
    },
    getInsertItem() {
      let item = null;
      this.index += 1;
      const value = `t${this.index}`;
      item = {
        icon: '',
        label: value,
        value,
      };
      return item;
    },
    append(node) {
      console.log(node)
      const { tree } = this.$refs;
      const item = this.getInsertItem();
      if (item) {
        if (!node) {
          tree.appendTo('', item);
        } else {
          tree.appendTo(node.value, item);
        }
      }
    },
    check(node) {
      console.info('check:', node);
    },
    changeIcon(node) {
      const { data } = node;
      // 需要自定义视图的数据，如果较多，可以存放到 data 里面
      data.icon = data.icon === 'folder' ? 'folder-open' : 'folder';
    },
    remove(node) {
      const { tree } = this.$refs;
      tree.remove(node.value);
    },
  },
};
</script>
<style>
  .tdesign-tree-state .title{
    margin-top: 10px;
    font-weight: bold;
  }
  .tdesign-tree-state .operations .t-button{
    margin: 0 10px 10px 0;
  }
  .tdesign-tree-state .t-tree__operations .t-button{
    margin-left: 10px;
  }
</style>

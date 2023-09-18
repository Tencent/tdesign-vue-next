<template>
  <t-space direction="vertical">
    <t-space>
      <t-button @click="append()">插入一个根节点</t-button>
    </t-space>
    <t-tree
      ref="tree"
      :data="items"
      hover
      expand-all
      activable
      checkable
      :expand-on-click-node="false"
      line
      :label="label"
      :icon="icon"
    >
      <template #operations="{ node }">
        <div class="tdesign-demo-block-row">
          <t-button size="small" variant="base" @click="check(node)">检查节点信息</t-button>
          <t-button size="small" variant="base" @click="changeTime(node)">变更时间</t-button>
          <t-button size="small" variant="base" @click="changeIcon(node)">变更图标</t-button>
          <t-button size="small" variant="base" @click="append(node)">添加子节点</t-button>
          <t-button size="small" variant="base" theme="danger" @click="remove(node)">删除</t-button>
        </div>
      </template>
    </t-tree>
  </t-space>
</template>

<script lang="jsx">
import { Icon } from 'tdesign-icons-vue-next';

export default {
  data() {
    const timeStamp = new Date('2021-12-12').getTime();
    return {
      index: 2,
      useActived: false,
      expandParent: true,
      // icon 要先预置到节点中，才能触发视图更新
      items: [
        {
          icon: '',
          value: 'node1',
          timeStamp,
        },
        {
          icon: '',
          value: 'node2',
          timeStamp,
        },
      ],
    };
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
      return <Icon name={name} />;
    },
    label(createElement, node) {
      return `${node.value}: ${node.data.timeStamp}`;
    },
    getInsertItem() {
      let item = null;
      this.index += 1;
      const value = `t${this.index}`;
      const timeStamp = new Date('2021-12-13').getTime();
      item = {
        icon: '',
        value,
        timeStamp,
      };
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
    changeTime(node) {
      const timeStamp = new Date().getTime();
      node.setData({
        timeStamp,
      });
    },
    remove(node) {
      node.remove();
    },
  },
};
</script>

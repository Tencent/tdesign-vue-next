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
import { Icon } from 'tdesign-icons-vue';

export default {
  data() {
    return {
      index: 2,
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
    icon(h, node) {
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
    label(h, node) {
      const timeStamp = node.data.timeStamp || '--';
      return `${node.value}: ${timeStamp}`;
    },
    getInsertItem() {
      let item = null;
      this.index += 1;
      const value = `t${this.index}`;
      item = {
        value,
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
      const icon = data.icon === 'folder' ? 'folder-open' : 'folder';
      // vue3 中，由于并未使用 defineProperty 进行属性监听，所以节点数据的直接变更未能反馈到 ui 组件
      // 因此提供 node.setData 方法专门处理这个问题，setData 方法触发 update 事件，通知 ui 组件更新
      node.setData({
        icon,
      });
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

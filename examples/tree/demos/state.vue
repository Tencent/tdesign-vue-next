<template>
  <div class="tdesign-tree-state">
    <h3 class="title">
      state:
    </h3>
    <t-tree
      ref="tree"
      :data="items"
      hover
      expand-all
      activable
      checkable
      :expand-on-click-node="false"
      line
      :icon="icon"
    >
      <template #operations="{node}">
        <t-button
          size="small"
          variant="base"
          @click="check(node)"
        >
          检查节点信息
        </t-button>
        <t-button
          size="small"
          variant="base"
          @click="changeIcon(node)"
        >
          变更图标
        </t-button>
        <t-button
          size="small"
          variant="base"
          @click="append(node)"
        >
          添加子节点
        </t-button>
        <t-button
          size="small"
          variant="base"
          theme="danger"
          @click="remove(node)"
        >
          删除
        </t-button>
      </template>
    </t-tree>
    <h3 class="title">
      api:
    </h3>
    <div class="operations">
      <t-button
        theme="primary"
        @click="append()"
      >
        插入一个根节点
      </t-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const items = [{
  icon: '',
  label: 'node1',
  value: 'node1',
}, {
  icon: '',
  label: 'node2',
  value: 'node2',
}];

const changeIcon = (node) => {
  const { data } = node;
  // 需要自定义视图的数据，如果较多，可以存放到 data 里面
  data.icon = data.icon === 'folder' ? 'folder-open' : 'folder';
};

const icon = (createElement, node) => {
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
};

export default defineComponent({
  setup() {
    const index = ref(2);

    const check = (node) => {
      console.info('check:', node);
    };

    const tree = ref(null);
    const remove = (node) => {
      tree.value.remove(node.value);
    };

    const getInsertItem = () => {
      let item = null;
      index.value += 1;
      const value = `t${index.value}`;
      item = {
        icon: '',
        label: value,
        value,
      };
      return item;
    };
    const append = (node) => {
      const item = getInsertItem();
      if (item) {
        if (!node) {
          tree.value.appendTo('', item);
        } else {
          tree.value.appendTo(node.value, item);
        }
      }
    };

    return {
      items,
      icon,
      check,
      changeIcon,
      remove,
      append,
    };
  },
});
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

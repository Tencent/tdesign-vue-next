<template>
  <div class="tdesign-tree-base">
    <h3>render:</h3>
    <t-tree
      :data="items"
      hover
      expand-all
      :load="load"
      :icon="icon"
    />
    <h3>scope slot:</h3>
    <t-tree
      :data="items"
      hover
      lazy
      :load="load"
    >
      <template #icon="{node}">
        <t-icon v-if="node.children && !node.expanded" name="caret-right" />
        <t-icon v-else-if="node.children && node.expanded" name="caret-down" />
        <t-icon v-else name="attach" />
      </template>
    </t-tree>
  </div>
</template>

<script>
import TIcon from '@/src/icon/svg';

export default {
  components: { TIcon },
  data() {
    return {
      items: [{
        label: '1',
        children: true,
      }, {
        label: '2',
        children: true,
      }],
    };
  },
  methods: {
    icon(createElement, node) {
      let name = 'file';
      if (node.children) {
        if (node.expanded) {
          name = 'folder-open';
        } else {
          name = 'folder';
        }
      }
      return createElement('t-icon', {
        props: {
          name,
        },
      });
    },
    load(node) {
      const maxLevel = 2;
      return new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < maxLevel) {
            nodes = [{
              label: `${node.label}.1`,
              children: node.level < maxLevel - 1,
            }, {
              label: `${node.label}.2`,
              children: node.level < maxLevel - 1,
            }];
          }
          resolve(nodes);
        }, 100);
      });
    },
  },
};
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>

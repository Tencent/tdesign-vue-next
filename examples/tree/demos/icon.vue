<template>
  <div class="tdesign-tree-base">
    <h3>render:</h3>
    <t-tree
      :data="items"
      :hover="true"
      :expand-all="true"
      :load="load"
      :icon="icon"
    />
    <h3>scope slot:</h3>
    <t-tree
      :data="items"
      :hover="true"
      :load="load"
      :lazy="true"
    >
      <template slot="icon" slot-scope="{node}">
        <t-icon v-if="node.children && !node.expanded" name="rectangle-add" />
        <t-icon v-else-if="node.children && node.expanded" name="rectangle-remove" />
        <t-icon v-else name="double-arrow-right" />
      </template>
    </t-tree>
  </div>
</template>

<script>
export default {
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
      let icon = 'file';
      if (node.children) {
        if (node.expanded) {
          icon = 'folder-open';
        } else {
          icon = 'folder';
        }
      }
      return icon;
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
        }, 1000);
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

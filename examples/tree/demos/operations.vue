<template>
  <div class="tdesign-tree-base">
    <t-tree
      :data="items"
      :hover="true"
      :expand-all="true"
      :label="getLabel"
      lazy
    />
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
    getLabel(createElement, node) {
      const pathNodes = node.getPath();
      const label = pathNodes
        .map(itemNode => (itemNode.getIndex() + 1))
        .join('.');
      return label;
    },
  },
};
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>

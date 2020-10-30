<template>
  <div class="tdesign-tree-base">
    <t-tree
      :data="items"
      :hover="true"
      :expand-all="true"
      :load="load"
    />
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
    load(node) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < 2) {
            nodes = [{
              label: `${node.label}.1`,
              children: true,
            }, {
              label: `${node.label}.2`,
              children: true,
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

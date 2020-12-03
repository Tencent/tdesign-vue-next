<template>
  <div class="tdesign-tree-base">
    <h3>显示连线</h3>
    <t-tree
      :data="items"
      line
      expand-all
    />
    <h3>render</h3>
    <t-tree
      :data="items"
      expand-all
      :line="renderLine"
    />
    <h3>scope slot</h3>
    <t-tree
      :data="items"
      line
      expand-all
    >
      <template #line="{node}">
        <span v-for="(item, index) in node.getParents()" :key="index">+</span>
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
        children: [{
          label: '1.1',
        }, {
          label: '1.2',
        }],
      }, {
        label: '2',
        children: [{
          label: '2.1',
          children: [{
            label: '2.1.1',
            children: [{
              label: '2.1.1.1',
              children: [{
                label: '2.1.1.1.1',
              }, {
                label: '2.1.1.1.2',
              }],
            }],
          }],
        }, {
          label: '2.2',
        }],
      }, {
        label: '3',
        children: [{
          label: '3.1',
        }, {
          label: '3.2',
        }],
      }, {
        label: '4',
      }],
    };
  },
  methods: {
    renderLine(createElement, node) {
      return new Array(node.level + 1).join('_');
    },
  },
};
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>

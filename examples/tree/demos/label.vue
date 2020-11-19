<template>
  <div class="tdesign-tree-base">
    <h3>render:</h3>
    <t-tree
      :data="items"
      :label="label"
      :expand-all="true"
    ></t-tree>
    <h3>scope slot:</h3>
    <t-tree
      :data="items"
      :expand-all="true"
      :checkable="true"
    >
      <span slot="label" slot-scope="{node}">
        <font color="blue">label: {{node.label}}, value: {{node.value}}</font>
      </span>
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
        }, {
          label: '2.2',
        }],
      }],
      label(createElement, node) {
        return createElement('strong', {
          domProps: {
            innerHTML: `value: ${node.value}, label: ${node.label}`,
          },
        });
      },
    };
  },
};
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>

<template>
  <div class="tdesign-tree-base">
    <t-tree
      :data="items"
      expand-all
      :empty="empty"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{
        children: [{
        }, {
        }],
      }, {
        children: [{
        }, {
        }],
      }],
      empty(createElement, node) {
        return `value: ${node.value}`;
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

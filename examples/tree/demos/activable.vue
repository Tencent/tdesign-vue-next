<template>
  <div class="tdesign-tree-base">
    <t-tree
      :data="items"
      :hover="true"
      :activable="true"
      :expand-on-click-node="false"
    />
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
    };
  },
};
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>

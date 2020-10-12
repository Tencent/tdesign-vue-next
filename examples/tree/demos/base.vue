<template>
  <div class="tdesign-tree-base">
    <t-tree :data="items"/>
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
          children: [{
            label: '1.1.1',
          }, {
            label: '1.1.2',
          }],
        }, {
          label: '1.2',
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

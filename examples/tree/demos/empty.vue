<template>
  <div class="tdesign-tree-base">
    <t-tree :data="items" :empty="empty"/>
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
      empty(item) {
        return `id: ${item.id}`;
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

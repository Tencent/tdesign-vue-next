<template>
  <div class="tdesign-tree-base">
    <t-tree :data="items" activable hover transition/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{
        label: '第一段',
        children: [{
          label: '第二段',
        }, {
          label: '第二段',
        }],
      }, {
        label: '第一段',
        children: [{
          label: '第二段',
        }, {
          label: '第二段',
        }],
      }, {
        label: '第一段',
        children: [{
          label: '第二段',
        }, {
          label: '第二段',
        }],
      }, {
        label: '第一段',
        children: [{
          label: '第二段',
        }, {
          label: '第二段',
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

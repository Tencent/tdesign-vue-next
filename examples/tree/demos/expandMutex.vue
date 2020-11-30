<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-button :theme="mutex ? 'primary' : 'ghost'" @click="toggleMutex">互斥展开</t-button>
    </div>
    <t-tree
      :data="items"
      :hover="true"
      :expand-mutex="mutex"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      mutex: true,
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
          children: [{
            label: '1.2.1',
          }, {
            label: '1.2.2',
          }],
        }],
      }, {
        label: '2',
        children: [{
          label: '2.1',
          children: [{
            label: '2.1.1',
          }, {
            label: '2.1.2',
          }],
        }, {
          label: '2.2',
          children: [{
            label: '2.2.1',
          }, {
            label: '2.2.2',
          }],
        }],
      }],
    };
  },
  methods: {
    toggleMutex() {
      this.mutex = !this.mutex;
    },
  },
};
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>

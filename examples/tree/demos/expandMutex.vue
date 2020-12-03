<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-button :theme="mutex ? 'primary' : 'ghost'" @click="toggleMutex">互斥展开</t-button>
      <t-button :theme="expandOnClickNode ? 'primary' : 'ghost'" @click="toggleExpandOnClickNode">点击节点触发展开</t-button>
    </div>
    <t-tree
      :data="items"
      hover
      :expand-mutex="mutex"
      :expand-on-click-node="expandOnClickNode"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      mutex: true,
      expandOnClickNode: true,
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
    toggleExpandOnClickNode() {
      this.expandOnClickNode = !this.expandOnClickNode;
    },
  },
};
</script>
<style scoped>
  .tdesign-tree-base .t-button{
    margin: 0 10px 10px 0;
  }
</style>

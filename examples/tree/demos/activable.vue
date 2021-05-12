<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-button :variant="activable ? 'base' : 'outline'" @click="toggleActivable">节点可高亮</t-button>
      <t-button :variant="activeMultiple ? 'base' : 'outline'" @click="toggleActiveMultiple">节点可多选高亮</t-button>
      <t-button :variant="expandOnClickNode ? 'base' : 'outline'" @click="toggleExpandOnClickNode">点击整个节点可触发展开</t-button>
    </div>
    <t-tree
      :data="items"
      expand-all
      :activable="activable"
      :active-multiple="activeMultiple"
      :expand-on-click-node="expandOnClickNode"
      @click="onClick"
      @active="onActive"
      :onActive="propOnActive"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activable: true,
      activeMultiple: false,
      expandOnClickNode: false,
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
  methods: {
    onClick(context) {
      console.info('onClick', context);
    },
    onActive(value, context) {
      console.info('onActive', value, context);
    },
    propOnActive(value, context) {
      console.info('propOnActive', value, context);
    },
    toggleActivable() {
      this.activable = !this.activable;
    },
    toggleActiveMultiple() {
      this.activeMultiple = !this.activeMultiple;
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

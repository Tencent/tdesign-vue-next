<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-button :theme="activable ? 'primary' : 'ghost'" @click="toggleActivable">节点可高亮</t-button>
      <t-button :theme="activeMultiple ? 'primary' : 'ghost'" @click="toggleActiveMultiple">节点可多选高亮</t-button>
    </div>
    <t-tree
      :data="items"
      expand-all
      :activable="activable"
      :active-multiple="activeMultiple"
      :expand-on-click-node="false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activable: true,
      activeMultiple: false,
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
    toggleActivable() {
      this.activable = !this.activable;
    },
    toggleActiveMultiple() {
      this.activeMultiple = !this.activeMultiple;
    },
  },
};
</script>
<style scoped>
  .tdesign-tree-base .t-button{
    margin: 0 10px 10px 0;
  }
</style>

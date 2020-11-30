<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-button :theme="disabled ? 'primary' : 'ghost'" @click="toggleDisabled">禁用树</t-button>
    </div>
    <t-tree
      :data="items"
      :hover="true"
      :disabled="disabled"
      :checkable="true"
      :expand-all="true"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: true,
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
        }, {
          label: '2.2',
        }],
      }],
    };
  },
  methods: {
    toggleDisabled() {
      this.disabled = !this.disabled;
    },
  },
};
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>

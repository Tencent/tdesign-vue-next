<template>
  <div class="tdesign-tree-base">
    <t-tree
      :data="items"
      :hover="true"
      :checkable="true"
      :expand-all="true"
      @change="onChange"
      @click="onClick"
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
    onClick(state) {
      console.log('on click:', state);
    },
    onChange(state) {
      console.log('on change:', state);
    },
  },
};
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>

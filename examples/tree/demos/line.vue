<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-button :variant="showLine ? 'base' : 'outline'"  @click="toggleLine">显示连线</t-button>
      <t-button :variant="showIcon ? 'base' : 'outline'"  @click="toggleIcon">显示图标</t-button>
    </div>
    <t-tree
      :data="items"
      :line="showLine"
      :icon="showIcon"
      expand-all
    />
    <h3>render</h3>
    <t-tree
      :data="items"
      expand-all
      :line="renderLine"
    />
    <h3>scope slot</h3>
    <t-tree
      :data="items"
      line
      expand-all
    >
      <template #line="{node}">
        <span v-for="(item, index) in node.getParents()" :key="index">+</span>
      </template>
    </t-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLine: true,
      showIcon: true,
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
          children: [{
            label: '2.1.1',
            children: [{
              label: '2.1.1.1',
              children: [{
                label: '2.1.1.1.1',
              }, {
                label: '2.1.1.1.2',
              }],
            }],
          }, {
            label: '2.1.2',
          }],
        }, {
          label: '2.2',
        }],
      }, {
        label: '3',
        children: [{
          label: '3.1',
        }, {
          label: '3.2',
        }],
      }, {
        label: '4',
      }],
    };
  },
  methods: {
    toggleLine() {
      this.showLine = !this.showLine;
    },
    toggleIcon() {
      this.showIcon = !this.showIcon;
    },
    renderLine(createElement, node) {
      return new Array(node.level + 1).join('_');
    },
  },
};
</script>
<style scoped>
  .tdesign-tree-base .operations .t-button{
    margin: 0 10px 10px 0;
  }
</style>

<template>
  <div class="tdesign-tree-base">
    <h3>render:</h3>
    <t-tree :data="items" hover expand-all :load="load" :icon="icon" />
    <h3>scope slot:</h3>
    <t-tree :data="items" hover lazy :load="load">
      <template #icon="{ node }">
        <t-icon v-if="node.getChildren() && !node.expanded" name="caret-right" />
        <t-icon v-else-if="node.getChildren() && node.expanded" name="caret-down" />
        <t-icon v-else name="attach" />
      </template>
    </t-tree>
  </div>
</template>

<script>
import { defineComponent, resolveComponent, ref } from 'vue';
import TIcon from 'tdesign-vue-next/icon';

export default defineComponent({
  components: { TIcon },
  setup() {
    const items = ref([
      {
        label: '1',
        children: true,
      },
      {
        label: '2',
        children: true,
      },
    ]);

    const icon = (createElement, node) => {
      let name = 'file';
      const TIcon = resolveComponent('t-icon');
      if (node.getChildren()) {
        if (node.expanded) {
          name = 'folder-open';
        } else {
          name = 'folder';
        }
      }

      return createElement(TIcon, {
        name,
      });
    };

    const load = (node) => {
      const maxLevel = 2;
      return new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < maxLevel) {
            nodes = [
              {
                label: `${node.label}.1`,
                children: node.level < maxLevel - 1,
              },
              {
                label: `${node.label}.2`,
                children: node.level < maxLevel - 1,
              },
            ];
          }
          resolve(nodes);
        }, 100);
      });
    };

    return {
      items,
      icon,
      load,
    };
  },
});
</script>
<style scoped>
.demo-tree-base {
  display: block;
}
</style>

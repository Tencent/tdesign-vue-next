<template>
  <div class="tdesign-tree-base">
    <t-tree :data="items" hover expand-all :load="load" :lazy="false" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const items = [
  {
    label: '1',
    children: true,
  },
  {
    label: '2',
    children: true,
  },
];
export default defineComponent({
  setup() {
    const load = (node) =>
      new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < 2) {
            nodes = [
              {
                label: `${node.label}.1`,
                children: true,
              },
              {
                label: `${node.label}.2`,
                children: true,
              },
            ];
          }
          resolve(nodes);
        }, 1000);
      });

    return {
      items,
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

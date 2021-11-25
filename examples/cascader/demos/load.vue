<template>
  <div>
    <t-cascader v-model="value" class="t-demo-cascader" :options="options" clearable :load="load" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const options = ref([
      {
        label: '选项1',
        value: '1',
        children: true,
      },
      {
        label: '选项2',
        value: '2',
        children: true,
      },
    ]);

    const value = ref('');

    const load = (node) =>
      new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < 2) {
            nodes = [
              {
                label: `${node.label}.1`,
                children: node.level < 2,
              },
              {
                label: `${node.label}.2`,
                children: node.level < 2,
              },
            ];
          }
          resolve(nodes);
        }, 1000);
      });
    return {
      options,
      value,
      load,
    };
  },
});
</script>
<style scoped>
.t-demo-cascader + .t-demo-cascader {
  margin-top: 16px;
}
</style>

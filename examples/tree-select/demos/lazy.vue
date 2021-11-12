<template>
  <div class="tdesign-tree-select-lazy">
    <t-tree-select
      v-model="value"
      :data="options"
      clearable
      placeholder="请选择"
      :treeProps="{
        load: loadFunc
      }"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

const options = [{
  label: '1',
  value: '1',
  children: true,
}, {
  label: '2',
  value: '2',
  children: true,
}]

export default defineComponent({
  setup() {
    const value = ref('');
    
    const loadFunc = (node) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < 2) {
            nodes = [{
              label: `${node.label}.1`,
              value: `${node.value}.1`,
              children: true,
            }, {
              label: `${node.label}.2`,
              value: `${node.value}.2`,
              children: true,
            }];
          }
          resolve(nodes);
        }, 2000);
      });
    }

    return {
      value,
      options,
      loadFunc
    }
  }
});
</script>
<style scoped>
.tdesign-tree-select-lazy {
  width: 300px;
  margin: 0 20px;
}
</style>

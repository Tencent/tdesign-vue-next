<template>
  <div class="tdesign-tree-select-multiple">
    <t-tree-select
      v-model="value"
      :data="options"
      multiple
      clearable
      placeholder="请选择"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

const options = [{
  label: '广东省',
  value: 'guangdong',
  children: [{
    label: '广州市',
    value: 'guangzhou',
  }, {
    label: '深圳市',
    value: 'shenzhen',
  }],
}, {
  label: '江苏省',
  value: 'jiangsu',
  children: [{
    label: '南京市',
    value: 'nanjing',
  }, {
    label: '苏州市',
    value: 'suzhou',
  }],
}]

export default defineComponent({
  setup() {
    const value = ref(['guangzhou', 'shenzhen']);

    return {
      value,
      options
    }
  }
});
</script>
<style scoped>
.tdesign-tree-select-multiple {
  width: 300px;
  margin: 0 20px;
}
</style>

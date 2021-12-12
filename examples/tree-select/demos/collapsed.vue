<template>
  <div class="tdesign-tree-select-collapsed">
    <t-tree-select
      v-model="value"
      :data="options"
      class="demo-space"
      multiple
      clearable
      placeholder="请选择"
      :min-collapsed-num="1"
    >
    </t-tree-select>
    <t-tree-select v-model="slotValue" :data="options" multiple clearable placeholder="请选择" :min-collapsed-num="1">
      <template #collapsedItems>
        <t-tag>更多...</t-tag>
      </template>
    </t-tree-select>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

const options = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '广州市',
        value: 'guangzhou',
      },
      {
        label: '深圳市',
        value: 'shenzhen',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
      },
      {
        label: '苏州市',
        value: 'suzhou',
      },
    ],
  },
];
export default defineComponent({
  setup() {
    const value = ref(['guangzhou', 'shenzhen']);
    const slotValue = ref(['guangzhou', 'shenzhen']);

    return { options, value, slotValue };
  },
  data() {
    return {};
  },
});
</script>
<style scoped>
.tdesign-tree-select-collapsed {
  width: 300px;
  margin: 0 20px;
}
.demo-space {
  margin-bottom: 20px;
}
</style>

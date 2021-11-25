<template>
  <div class="tdesign-demo-select-base">
    <t-select v-model="value1" :options="options" placeholder="请选择云解决方案" />

    <t-select v-model="value2" :options="options" disabled placeholder="请选择云解决方案" />

    <t-select v-model="value3" :options="options" loading placeholder="请选择云解决方案" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  { label: '架构云', value: '1' },
  { label: '大数据', value: '2' },
  { label: '区块链', value: '3' },
  { label: '物联网', value: '4', disabled: true },
  { label: '人工智能', value: '5' },
];

export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref('');
    return {
      value1,
      value2,
      value3,
      options,
    };
  },
});
</script>

<style scoped>
.tdesign-demo-select-base {
  width: 680px;
  display: flex;
}

.tdesign-demo-select-base .t-select-wrap + .t-select-wrap {
  margin-left: 36px;
}
</style>

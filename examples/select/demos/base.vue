<template>
  <div class="tdesign-demo-select-base">
    <!-- 方式一：使用 options 输出下拉选项。优先级高于 t-option-->
    <t-select v-model="value1" :options="options1" placeholder="请选择云解决方案" />

    <!-- 方式二：使用 t-option 输出下拉选项。options 和 t-option 两种实现方式二选一即可 -->
    <t-select v-model="value2" placeholder="请选择云产品">
      <t-option v-for="item in options2" :key="item.value" :value="item.value" :label="item.label"></t-option>
    </t-select>
  </div>
</template>
<script setup lang="jsx">
import { ref } from 'vue';

const options1 = ref([
  { label: '架构云', value: '1' },
  { label: '大数据', value: '2' },
  { label: '区块链', value: '3' },
  { label: '物联网', value: '4', disabled: true },
  { label: '人工智能', value: '5' },
  // 可以使用渲染函数自定义下拉选项内容和样式
  {
    label: '计算场景',
    value: '6',
    content: () => <span>计算场景（高性能计算）</span>,
  },
]);

const options2 = ref([
  { label: '云服务器1', value: '1' },
  { label: '云数据库2', value: '2' },
  { label: '域名注册2', value: '3' },
  { label: '网站备案23', value: '4' },
  { label: '对象存储4', value: '5' },
  { label: '低代码平台123', value: '6' },
]);

const value1 = ref('');
const value2 = ref('');
</script>
<style scoped>
.tdesign-demo-select-base {
  width: 450px;
  display: flex;
}

.tdesign-demo-select-base .t-select__wrap + .t-select__wrap {
  margin-left: 36px;
}
</style>

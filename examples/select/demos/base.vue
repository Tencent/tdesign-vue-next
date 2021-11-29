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

<script lang="jsx">
import { defineComponent, ref } from 'vue';

const options1 = [
  { label: '架构云', value: '1' },
  { label: '大数据', value: '2' },
  { label: '区块链', value: '3' },
  { label: '物联网', value: '4', disabled: true },
  { label: '人工智能', value: '5' },
  // 可以使用渲染函数自定义下拉选项内容和样式
  {
    label: '计算场景',
    value: '6',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    content: (h) => <span>计算场景（高性能计算）</span>,
  },
];
const options2 = [
  { label: '云服务器', value: '1' },
  { label: '云数据库', value: '2' },
  { label: '域名注册', value: '3' },
  { label: '网站备案', value: '4' },
  { label: '对象存储', value: '5' },
  { label: '低代码平台', value: '6' },
];

export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref('');

    return {
      value1,
      value2,
      options1,
      options2,
    };
  },
});
</script>

<style scoped>
.tdesign-demo-select-base {
  width: 450px;
  display: flex;
}

.tdesign-demo-select-base .t-select-wrap + .t-select-wrap {
  margin-left: 36px;
}
</style>

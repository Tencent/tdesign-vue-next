<template>
  <t-space direction="vertical">
    <!-- 方式一：使用 options 输出下拉选项。优先级高于 t-option-->
    <t-select
      v-model="value1"
      :options="options1"
      placeholder="请选择云解决方案"
      multiple
      filterable
      @focus="onFocus"
      @blur="onBlur"
    />

    <!-- 方式二：使用 t-option 输出下拉选项。options 和 t-option 两种实现方式二选一即可 -->
    <t-select v-model="value2" placeholder="请选择云产品" multiple>
      <t-option label="全选" :check-all="true" />
      <t-option v-for="item in options2" :key="item.value" :value="item.value" :label="item.label"></t-option>
    </t-select>

    <!-- 超出 2 个的选中项折叠，如果想要自定义折叠项，参考下文「自定义折叠的选中项」 -->
    <t-select
      v-model="value3"
      label="折叠选项："
      :options="options1"
      :min-collapsed-num="2"
      placeholder="请选择云解决方案"
      multiple
    />
  </t-space>
</template>
<script setup lang="jsx">
import { ref } from 'vue';

const options1 = [
  { label: '全选', checkAll: true },
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

const value1 = ref(['1', '3', '4']);
const value2 = ref(['1', '2', '3', '4', '5', '6']);
const value3 = ref(['3', '5', '6', '2']);

const onFocus = (ctx) => {
  console.log('focus:', ctx);
};

const onBlur = (ctx) => {
  console.log('blur:', ctx);
};
</script>

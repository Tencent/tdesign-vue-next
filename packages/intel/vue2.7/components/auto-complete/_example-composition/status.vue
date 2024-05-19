<template>
  <t-space direction="vertical" size="32px">
    <t-auto-complete
      v-model="value1"
      :options="options"
      disabled
      tips="这是禁用状态"
      highlightKeyword
      placeholder="请输入关键词搜索"
      @change="onChange"
    />
    <t-auto-complete
      v-model="value2"
      :options="options"
      readonly
      tips="这是只读状态"
      highlightKeyword
      placeholder="请输入关键词搜索"
      @change="onChange"
    />
    <t-auto-complete
      v-model="value3"
      :options="options"
      tips="这是普通状态"
      highlightKeyword
      placeholder="请输入关键词搜索"
      @change="onChange"
    />
    <t-auto-complete
      v-model="value4"
      :options="options"
      tips="这是告警状态"
      status="warning"
      highlightKeyword
      placeholder="请输入关键词搜索"
      @change="onChange"
    />
    <t-auto-complete
      v-model="value5"
      :options="options"
      tips="这是错误状态"
      status="error"
      highlightKeyword
      placeholder="请输入关键词搜索"
      @change="onChange"
    />
    <t-auto-complete
      v-model="value6"
      :options="options"
      tips="这是成功状态"
      status="success"
      highlightKeyword
      placeholder="请输入关键词搜索"
      @change="onChange"
    />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref('第一个默认联想词');
const value2 = ref('第一个默认联想词');
const value3 = ref('');
const value4 = ref('');
const value5 = ref('');
const value6 = ref('');
const options = ref(['第一个默认联想词', '第二个默认联想词', '第三个默认联想词']);
const timer = ref(null);
// 输入框内容发生变化时进行搜索，200ms 搜索一次
const onChange = (value) => {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    const text = '搜索联想词';
    const pureValue = value.replace(`第一个${text}`, '').replace(`第二个${text}`, '').replace(`第三个${text}`, '');
    options.value = [`${pureValue}第一个${text}`, `${pureValue}第二个${text}`, `${pureValue}第三个${text}`];
    clearTimeout(timer.value);
  }, 200);
};
</script>

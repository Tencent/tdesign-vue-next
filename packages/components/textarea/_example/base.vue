<template>
  <t-space direction="vertical">
    <t-textarea v-model="value" placeholder="请输入描述文案" name="description" @change="onChange" />

    <t-textarea
      v-model="value2"
      placeholder="请输入文案，高度可自适应；autosize=true"
      name="description"
      :autosize="true"
    />

    <t-textarea
      v-model="value3"
      placeholder="请输入文案，高度可自适应，最小3行，最大5行；autosize={minRows: 3, maxRows: 5}"
      name="description"
      :autosize="{ minRows: 3, maxRows: 5 }"
    />

    <t-textarea v-model="value4" placeholder="可清空的文本框" name="description" clearable />
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TextareaProps } from 'tdesign-vue-next';

const value = ref('');
const value2 = ref('');
const value3 = ref('');
const value4 = ref('这是测试内容，可以点击右侧的清空按钮来清空');
const onChange: TextareaProps['onChange'] = (value, e) => {
  console.log('onChange：', value, e);
};
</script>

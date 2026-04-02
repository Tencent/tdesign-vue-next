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
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TextareaProps } from 'tdesign-vue-next';
const value = ref('');
const value2 = ref('');
const value3 = ref('');
const onChange: TextareaProps['onChange'] = (value, e) => {
  console.log('onChange：', value, e);
};
</script>

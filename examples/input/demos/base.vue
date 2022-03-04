<template>
  <div class="tdesign-demo-block-column" style="max-width: 500px">
    <t-input />

    <t-input v-model="input" placeholder="请输入内容（有默认值）" @enter="onEnter" @change="onChange" />
    <t-input label="价格：" suffix="元" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const input = ref('有默认值');
const onEnter = () => {
  console.log('trigger enter');
};
const onChange = (val) => {
  console.log(val);
};

const onPaste = (context) => {
  console.log(context);
};
</script>

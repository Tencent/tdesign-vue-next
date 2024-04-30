<template>
  <t-tag-input v-model="tags" placeholder="最多只能输入 3 个标签" :max="3" @enter="onEnter" />
</template>

<script setup>
import { ref } from 'vue';

import { MessagePlugin } from 'tdesign-vue-next';

const tags = ref([]);
const onEnter = (value, { inputValue }) => {
  if (value.length >= 3 && inputValue) {
    MessagePlugin.warning('最多只能输入 3 个标签!');
  }
};
</script>

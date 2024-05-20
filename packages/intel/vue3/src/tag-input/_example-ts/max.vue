<template>
  <t-tag-input v-model="tags" placeholder="最多只能输入 3 个标签" :max="3" @enter="onEnter" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MessagePlugin, TagInputProps } from 'tdesign-vue-next';
const tags = ref([]);
const onEnter: TagInputProps['onEnter'] = (value, { inputValue }) => {
  if (value.length >= 3 && inputValue) {
    MessagePlugin.warning('最多只能输入 3 个标签!');
  }
};
</script>

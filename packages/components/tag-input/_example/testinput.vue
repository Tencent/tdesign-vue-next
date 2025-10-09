<template>
  <!-- 父组件使用 -->
  <t-tag-input
    v-model="tags"
    :on-focus="() => console.log('tag input focus')"
    :on-change="() => console.log('tag input change')"
    :input-props="{
      placeholder: '粘贴多个标签（逗号分隔）',
      size: 'large',
      onPaste: () => console.log('paste'),
      onFocus: () => console.log('input focus'),
      onKeydown: (e) => console.log('keydown', e),
      onChange: (e) => console.log('input change', e),
      onBlur: () => console.log('blur'),
      onClear: () => console.log('clear'),
    }"
  />
</template>

<script setup>
import { ref } from 'vue';

const tags = ref([]);
</script>

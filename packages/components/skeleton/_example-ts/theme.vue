<template>
  <div className="t-skeleton-demo">
    <div v-for="(theme, index) in themes" :key="`theme-${index}`" className="t-skeleton-demo-card">
      <div className="header">{{ theme.label }}</div>
      <div className="content">
        <t-skeleton :theme="theme.value"></t-skeleton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const themes = [
  { label: '文本', value: 'text' },
  { label: '头像', value: 'avatar' },
  { label: '段落', value: 'paragraph' },
  { label: '头像描述', value: 'avatar-text' },
  { label: '选项卡', value: 'tab' },
  { label: '文章', value: 'article' },
];
</script>

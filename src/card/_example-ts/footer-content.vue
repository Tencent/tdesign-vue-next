<template>
  <t-card :cover="cover" theme="poster2" :style="{ width: '400px' }">
    <template #footer>
      <t-comment avatar="https://tdesign.gtimg.com/site/avatar-boy.jpg" author="标题" content="卡片内容" />
    </template>
  </t-card>
</template>
<script lang="tsx" setup>
import { CardProps } from 'tdesign-vue-next';
const cover: CardProps['cover'] = 'https://tdesign.gtimg.com/site/source/card-demo.png';
</script>

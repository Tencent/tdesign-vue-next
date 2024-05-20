<template>
  <t-card :cover="cover" theme="poster2" :style="{ width: '400px' }">
    <template #footer>
      <t-comment avatar="https://tdesign.gtimg.com/site/avatar-boy.jpg" author="标题" content="卡片内容" />
    </template>
  </t-card>
</template>
<script setup lang="jsx">
import { ref } from 'vue';

const cover = ref('https://tdesign.gtimg.com/site/source/card-demo.png');
</script>

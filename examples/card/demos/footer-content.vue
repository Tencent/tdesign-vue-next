<template>
  <t-card :cover="cover" theme="poster2" :style="{ width: '400px' }">
    <template #footer>
      <t-comment avatar="https://tdesign.gtimg.com/site/avatar-boy.jpg" author="标题" content="卡片内容" />
    </template>
  </t-card>
</template>
<script setup lang="jsx">
import { MoreIcon } from 'tdesign-icons-vue-next';

import { MessagePlugin } from 'tdesign-vue-next';

const clickHandler = (data) => {
  MessagePlugin.success(`选中【${data.content}】`);
};
const cover = 'https://tdesign.gtimg.com/site/source/card-demo.png';
</script>

<template>
  <t-card :cover="cover" theme="poster2" :style="{ width: '400px' }">
    <template #footer>
      <t-comment avatar="https://tdesign.gtimg.com/site/avatar-boy.jpg" author="标题" content="卡片内容" />
    </template>
  </t-card>
</template>
<script lang="jsx">
import { MessagePlugin } from 'tdesign-vue';

export default {
  data() {
    return {
      cover: 'https://tdesign.gtimg.com/site/source/card-demo.png',
    };
  },
  methods: {
    clickHandler(data) {
      MessagePlugin.success(`选中【${data.content}】`);
    },
  },
};
</script>

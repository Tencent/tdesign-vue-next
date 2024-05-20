<template>
  <t-card :title="title" @actions="clickHandler" :style="{ width: '400px' }">
    {{ infoMessage }}
    <template #actions>
      <a href="javascript:void(0)" @click="clickHandler">操作</a>
    </template>
  </t-card>
</template>
<script setup>
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue';

const title = ref('标题');
const infoMessage = ref(
  '仅有内容区域的卡片形式。卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。',
);
const clickHandler = () => {
  MessagePlugin.success('操作');
};
</script>

<template>
  <t-comment
    avatar="https://tdesign.gtimg.com/site/avatar.jpg"
    author="评论作者名"
    datetime="今天16:38"
    content="这里是评论者写的评论内容。"
    :actions="actions"
  />
</template>

<script setup lang="tsx">
import { h } from 'vue';
import { ChatIcon, ThumbUpIcon } from 'tdesign-icons-vue-next';

const actions = [() => [h(ThumbUpIcon), h('span', '6')], () => [h(ChatIcon), h('span', '回复')]];
</script>

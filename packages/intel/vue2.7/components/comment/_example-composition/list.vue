<template>
  <t-list :split="true">
    <t-list-item v-for="(item, index) in commentsData" :key="index">
      <template #content>
        <t-comment :avatar="item.avatar" :author="item.author" :datetime="item.datetime" :content="item.content">
          <template #actions>
            <span key="thumbUp">
              <icon name="thumb-up" />
              <span class="action-text">6</span>
            </span>
            <span key="chat">
              <icon name="chat" />
              <span class="action-text">回复</span>
            </span>
          </template>
        </t-comment>
      </template>
    </t-list-item>
  </t-list>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from 'tdesign-icons-vue';

const commentsData = ref([
  {
    id: 'A',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    author: '评论作者名A',
    datetime: '今天16:38',
    content: '评论作者名A写的评论内容。',
  },
  {
    id: 'B',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    author: '评论作者名B',
    datetime: '今天16:38',
    content: '评论作者名B写的评论内容。',
  },
  {
    id: 'C',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    author: '评论作者名C',
    datetime: '今天16:38',
    content: '评论作者名C写的评论内容。',
  },
]);
</script>

<style lang="less" scoped>
.action-text {
  display: inline-block;
  margin-left: 6px;
  line-height: 15px;
}
</style>

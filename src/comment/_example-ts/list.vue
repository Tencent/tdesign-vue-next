<template>
  <t-list :split="true">
    <t-list-item v-for="(item, index) in commentsData" :key="index">
      <template #content>
        <t-comment :avatar="item.avatar" :author="item.author" :datetime="item.datetime" :content="item.content">
          <template #actions>
            <t-space key="thumbUp" :size="6">
              <t-icon name="thumb-up" />
              <span>6</span>
            </t-space>
            <t-space key="chat" :size="6">
              <t-icon name="chat" />
              <span>回复</span>
            </t-space>
          </template>
        </t-comment>
      </template>
    </t-list-item>
  </t-list>
</template>

<script lang="tsx" setup>
const commentsData = [
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
];
</script>

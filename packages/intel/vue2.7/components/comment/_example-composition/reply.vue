<template>
  <t-comment
    avatar="https://tdesign.gtimg.com/site/avatar.jpg"
    author="评论作者名"
    datetime="今天16:38"
    content="这里是评论者写的评论内容。"
  >
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

    <template #reply>
      <t-comment
        avatar="https://tdesign.gtimg.com/site/avatar.jpg"
        datetime="今天16:38"
        content="这里是评论者写的评论内容。"
      >
        <template #author>
          <span>评论作者名B</span>
          <caret-right-small-icon size="small" class="author-icon" />
          <span>评论作者名A</span>
        </template>

        <template #actions>
          <span key="thumbUp">
            <thumb-up-icon />
            <span class="action-text">6</span>
          </span>
          <span key="chat">
            <chat-icon />
            <span class="action-text">回复</span>
          </span>
        </template>
      </t-comment>
    </template>
  </t-comment>
</template>

<script setup>
import { CaretRightSmallIcon, ThumbUpIcon, ChatIcon } from 'tdesign-icons-vue';
</script>

<style lang="less" scoped>
.action-text {
  display: inline-block;
  margin-left: 6px;
  line-height: 15px;
}

.author-icon {
  display: inline-block;
  margin: 0 4px;
}
</style>

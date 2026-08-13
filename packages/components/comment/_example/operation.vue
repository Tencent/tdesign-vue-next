<template>
  <t-comment
    avatar="https://tdesign.gtimg.com/site/avatar.jpg"
    author="评论作者名"
    datetime="今天16:38"
    content="这里是评论者写的评论内容。"
  >
    <template #actions>
      <t-space key="thumbUp" :size="6" align="center">
        <t-icon class="comment-action-icon" name="thumb-up" />
        <span>6</span>
      </t-space>
      <t-space key="chat" :size="6" align="center">
        <t-icon class="comment-action-icon" name="chat" />
        <span>回复</span>
      </t-space>
    </template>
  </t-comment>
</template>

<style scoped>
.comment-action-icon {
  display: block;
}
</style>

<template>
  <t-comment
    avatar="https://tdesign.gtimg.com/site/avatar.jpg"
    author="评论作者名"
    datetime="今天16:38"
    content="这里是评论者写的评论内容。"
  >
    <template #actions>
      <span key="thumbUp">
        <t-icon name="thumb-up" />
        <span class="action-text">6</span>
      </span>
      <span key="chat">
        <t-icon name="chat" />
        <span class="action-text">回复</span>
      </span>
    </template>
  </t-comment>
</template>
<style lang="less" scoped>
.action-text {
  display: inline-block;
  margin-left: 6px;
  line-height: 15px;
}
</style>

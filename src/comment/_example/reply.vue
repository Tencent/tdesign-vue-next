<template>
  <t-comment
    avatar="https://tdesign.gtimg.com/site/avatar.jpg"
    author="评论作者名"
    datetime="今天 16:38"
    content="这里是评论者写的评论内容。"
    class="comment-reply"
  >
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

    <template #reply>
      <t-comment
        avatar="https://tdesign.gtimg.com/site/avatar.jpg"
        datetime="今天 16:38"
        content="这里是评论者写的评论内容。"
      >
        <template #author>
          <span>评论作者名B</span>
          <t-icon name="caret-right-small" size="medium" style="margin: 0 4px" />
          <span>评论作者名A</span>
        </template>

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
  </t-comment>
</template>
<style lang="less">
.comment-reply {
  > .t-comment__inner {
    > .t-comment__content {
      > .t-comment__actions {
        margin-right: 24px;
      }
    }
  }
}
</style>

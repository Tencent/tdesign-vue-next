<template>
  <t-comment
    avatar="https://tdesign.gtimg.com/site/avatar.jpg"
    author="评论作者名"
    datetime="今天16:38"
    content="这里是评论者写的评论内容。"
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

    <template #quote>
      <t-comment author="引用内容标题" content="引用评论内容。" />
    </template>
  </t-comment>
</template>

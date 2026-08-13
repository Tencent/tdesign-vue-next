<template>
  <div class="comment-operation-demo">
    <section class="comment-operation-demo__item">
      <h3>Slot</h3>
      <t-comment v-bind="commentProps">
        <template #actions>
          <t-space :size="6" align="center">
            <t-icon class="comment-action-icon" name="thumb-up" />
            <span>6</span>
          </t-space>
          <t-space :size="6" align="center">
            <t-icon class="comment-action-icon" name="chat" />
            <span>回复</span>
          </t-space>
        </template>
      </t-comment>
    </section>

    <section class="comment-operation-demo__item">
      <h3>Array</h3>
      <t-comment v-bind="commentProps" :actions="actionList" />
    </section>

    <section class="comment-operation-demo__item">
      <h3>Function</h3>
      <t-comment v-bind="commentProps" :actions="renderActions" />
    </section>
  </div>
</template>

<script setup lang="tsx">
import { ChatIcon, ThumbUpIcon } from 'tdesign-icons-vue-next';
import { Space, type CommentProps } from 'tdesign-vue-next';

const commentProps = {
  avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  author: '评论作者名',
  datetime: '今天16:38',
  content: '这里是评论者写的评论内容。',
};

const actionList: CommentProps['actions'] = [
  () => (
    <Space size={6} align="center">
      <ThumbUpIcon class="comment-action-icon" />
      <span>6</span>
    </Space>
  ),
  () => (
    <Space size={6} align="center">
      <ChatIcon class="comment-action-icon" />
      <span>回复</span>
    </Space>
  ),
];

const renderActions: CommentProps['actions'] = () => [
  <Space size={6} align="center" key="thumbUp">
    <ThumbUpIcon class="comment-action-icon" />
    <span>6</span>
  </Space>,
  <Space size={6} align="center" key="chat">
    <ChatIcon class="comment-action-icon" />
    <span>回复</span>
  </Space>,
];
</script>

<style scoped>
.comment-operation-demo {
  width: 100%;
}

.comment-operation-demo__item + .comment-operation-demo__item {
  margin-top: 24px;
}

.comment-operation-demo h3 {
  margin: 0 0 8px;
}
</style>

<style>
/* TSX 返回的图标节点不带当前 SFC 的 scoped 属性，通过容器选择器统一消除 SVG 基线空隙。 */
.comment-operation-demo .comment-action-icon {
  display: block;
}
</style>

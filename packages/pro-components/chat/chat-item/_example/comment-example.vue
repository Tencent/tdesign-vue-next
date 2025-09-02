<template>
  <div class="comment-example">
    <h3>使用 comment 属性的示例</h3>

    <div class="example-section">
      <h4>点赞状态</h4>
      <t-chat-action
        content="这是一个被点赞的消息"
        :action-bar="['good', 'bad', 'copy']"
        comment="good"
        @actions="handleAction"
      />
    </div>

    <div class="example-section">
      <h4>点踩状态</h4>
      <t-chat-action
        content="这是一个被点踩的消息"
        :action-bar="['good', 'bad', 'copy']"
        comment="bad"
        @actions="handleAction"
      />
    </div>

    <div class="example-section">
      <h4>无评价状态</h4>
      <t-chat-action
        content="这是一个没有评价的消息"
        :action-bar="['good', 'bad', 'copy']"
        comment=""
        @actions="handleAction"
      />
    </div>

    <div class="example-section">
      <h4>动态评价状态</h4>
      <t-chat-action
        content="点击按钮可以切换评价状态"
        :action-bar="['good', 'bad', 'copy']"
        :comment="dynamicComment"
        @actions="handleDynamicAction"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dynamicComment = ref('');

const handleAction = (type, context) => {
  console.log('Action clicked:', type, context);
};

const handleDynamicAction = (type, context) => {
  if (type === 'good') {
    dynamicComment.value = dynamicComment.value === 'good' ? '' : 'good';
  } else if (type === 'bad') {
    dynamicComment.value = dynamicComment.value === 'bad' ? '' : 'bad';
  }
  console.log('Dynamic action clicked:', type, 'Current comment:', dynamicComment.value);
};
</script>

<style scoped>
.comment-example {
  padding: 20px;
}

.example-section {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #e7e7e7;
  border-radius: 6px;
}

.example-section h4 {
  margin: 0 0 15px 0;
  color: #333;
}
</style>

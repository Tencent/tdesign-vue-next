<template>
  <div class="comment-validation-test">
    <h3>Comment 属性验证测试</h3>

    <div class="test-section">
      <h4>空字符串（默认值）</h4>
      <t-chat-action content="测试空字符串" :action-bar="['good', 'bad', 'copy']" comment="" @actions="handleAction" />
    </div>

    <div class="test-section">
      <h4>good 值</h4>
      <t-chat-action
        content="测试 good 值"
        :action-bar="['good', 'bad', 'copy']"
        comment="good"
        @actions="handleAction"
      />
    </div>

    <div class="test-section">
      <h4>bad 值</h4>
      <t-chat-action
        content="测试 bad 值"
        :action-bar="['good', 'bad', 'copy']"
        comment="bad"
        @actions="handleAction"
      />
    </div>

    <div class="test-section">
      <h4>动态切换</h4>
      <t-chat-action
        content="点击按钮动态切换评价"
        :action-bar="['good', 'bad', 'copy']"
        :comment="dynamicComment"
        @actions="handleDynamicAction"
      />
      <p>当前评价状态: {{ dynamicComment || '无评价' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dynamicComment = ref('');

const handleAction = (type, context) => {
  console.log('Action clicked:', type, context);
};

const handleDynamicAction = (type) => {
  if (type === 'good') {
    dynamicComment.value = dynamicComment.value === 'good' ? '' : 'good';
  } else if (type === 'bad') {
    dynamicComment.value = dynamicComment.value === 'bad' ? '' : 'bad';
  }
  console.log('Dynamic action clicked:', type, 'Current comment:', dynamicComment.value);
};
</script>

<style scoped>
.comment-validation-test {
  padding: 20px;
}

.test-section {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #e7e7e7;
  border-radius: 6px;
}

.test-section h4 {
  margin: 0 0 15px 0;
  color: #333;
}

.test-section p {
  margin: 10px 0 0 0;
  color: #666;
  font-size: 14px;
}
</style>

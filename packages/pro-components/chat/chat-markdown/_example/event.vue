<template>
  <t-chat-markdown :content="displayText" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { findTargetElement } from '@tdesign-vue-next/chat';

const doc = `
这是一个markdown[链接地址](http://example.com), 点击后**不会**自动跳转.
`;

const displayText = ref(doc);
const isTyping = ref(false);
const timerRef = ref(null);
const currentIndex = ref(doc.length);
const startTimeRef = ref(Date.now());

// 自定义链接的点击
const handleResourceClick = (event) => {
  event.preventDefault();
  // 查找符合条件的目标元素
  const targetResource = findTargetElement(event, ['a[part=md_a]']);
  if (targetResource) {
    // 获取链接地址并触发回调
    const href = targetResource.getAttribute('href');
    if (href) {
      console.log('跳转链接href', href);
    }
  }
};

// 模拟打字效果
const typeEffect = () => {
  if (!isTyping.value) return;

  if (currentIndex.value < doc.length) {
    const char = doc[currentIndex.value];
    currentIndex.value += 1;
    displayText.value += char;
    timerRef.value = setTimeout(typeEffect, 10);
  } else {
    // 输入完成时自动停止
    isTyping.value = false;
  }
};

onMounted(() => {
  // 注册全局点击事件监听
  document.addEventListener('click', handleResourceClick);

  // 处理打字效果
  if (isTyping.value) {
    // 如果已经完成输入，点击开始则重置
    if (currentIndex.value >= doc.length) {
      currentIndex.value = 0;
      displayText.value = '';
    }
    startTimeRef.value = Date.now();
    timerRef.value = setTimeout(typeEffect, 500);
  }
});

onUnmounted(() => {
  // 清理函数
  document.removeEventListener('click', handleResourceClick);
  if (timerRef.value) clearTimeout(timerRef.value);
});
</script>

<style scoped></style>

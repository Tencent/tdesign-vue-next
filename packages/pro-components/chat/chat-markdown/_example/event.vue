<template>
  <t-chat-markdown :content="displayText" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const doc = `
这是一个markdown[链接地址](http://example.com), 点击后**不会**自动跳转.
`;

const displayText = ref(doc);
const isTyping = ref(false);
const timerRef = ref(null);
const currentIndex = ref(doc.length);
const startTimeRef = ref(Date.now());

const findTargetElement = (event: MouseEvent, selector: string | string[]): HTMLElement | null => {
  // 统一处理选择器输入格式（支持字符串或数组）
  const selectors = Array.isArray(selector) ? selector : selector.split(',').map((s) => s.trim());

  // 获取事件穿透路径（包含Shadow DOM内部元素）
  const eventPath = event.composedPath();

  // 遍历路径查找目标元素
  for (const el of eventPath) {
    // 类型安全判断 + 多选择器匹配
    if (el instanceof HTMLElement) {
      // 检查是否匹配任意一个选择器
      if (selectors.some((sel) => el.matches?.(sel))) {
        return el; // 找到即返回
      }
    }
  }

  return null; // 未找到返回null
};
// 自定义链接的点击
const handleResourceClick = (event: MouseEvent) => {
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

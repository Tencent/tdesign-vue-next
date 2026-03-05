<template>
  <t-chat-markdown :content="displayText" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const doc = `
这是一个markdown[链接地址](http://example.com), 点击后**不会**自动跳转.
`;

const displayText = ref(doc);
const timerRef = ref(null);

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

onMounted(() => {
  // 注册全局点击事件监听
  document.addEventListener('click', handleResourceClick);
});

onUnmounted(() => {
  // 清理函数
  document.removeEventListener('click', handleResourceClick);
  if (timerRef.value) clearTimeout(timerRef.value);
});
</script>

<style scoped></style>

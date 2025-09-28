<template>
  <t-space direction="vertical">
    <t-space>
      <t-space align="center">
        <span>代码块主题切换：</span>
        <t-switch v-model="isDarkTheme" size="large" @change="handleCodeThemeChange" />
      </t-space>
    </t-space>
    <!-- 通过key强制重新挂载组件 -->
    <t-chat-markdown :key="rerenderKey" :content="mdContent" :options="options" />
  </t-space>
</template>

<script setup>
import { ref, computed } from 'vue';
import 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';

const mdContent = `
---

## 代码块主题设置演示

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 输出: 55
\`\`\`

\`\`\`python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
\`\`\`
`;

const isDarkTheme = ref(false);
const rerenderKey = ref(1);

// 切换代码块主题
const handleCodeThemeChange = (checked) => {
  isDarkTheme.value = checked;
  rerenderKey.value += 1;
};

const options = computed(() => ({
  themeSettings: {
    // 代码块主题设置, 默认是'light'
    codeBlockTheme: isDarkTheme.value ? 'dark' : 'light',
  },
}));
</script>

<style scoped></style>

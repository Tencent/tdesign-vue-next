<template>
  <t-space direction="vertical">
    <t-space>
      <strong>动态加载插件：</strong>
      <t-space align="center">
        <span>公式</span>
        <t-switch v-model="hasKatex" size="large" @change="handleKatexChange" />
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

## 块级公式

$$
E=mc^2
$$

## 行内公式
这是一个行内公式 $\\sqrt{3x-1}+(1+x)^2$
`;

const hasKatex = ref(false);
const rerenderKey = ref(1);

// 切换公式插件
const handleKatexChange = (checked) => {
  hasKatex.value = checked;
  rerenderKey.value += 1;
};

const options = computed(() => ({
  engine: {
    syntax: hasKatex.value
      ? {
          mathBlock: {
            engine: 'katex',
          },
          inlineMath: {
            engine: 'katex',
          },
        }
      : undefined,
  },
}));
</script>

<style scoped></style>

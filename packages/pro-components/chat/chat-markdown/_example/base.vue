<template>
  <t-space direction="vertical">
    <t-button @click="toggleTyping">{{ isTyping ? '暂停' : '流式输出' }}</t-button>
    <t-chat-markdown :content="displayText" />
  </t-space>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const doc = `
# This is TDesign

## This is TDesign

### This is TDesign

#### This is TDesign

The point of reference-style links is not that they’re easier to write. The point is that with reference-style links, your document source is vastly more readable. Compare the above examples: using reference-style links, the paragraph itself is only 81 characters long; with inline-style links, it’s 176 characters; and as raw \`HTML\`, it’s 234 characters. In the raw \`HTML\`, there’s more markup than there is text.

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet.

an example | *an example* | **an example**

1. Bird
1. McHale
1. Parish
    1. Bird
    1. McHale
        1. Parish

- Red
- Green
- Blue
    - Red
    - Green
        - Blue

This is [an example](http://example.com/ "Title") inline link.

<http://example.com/>

\`\`\`bash
$ npm i tdesign-vue-next
\`\`\`

---

\`\`\`javascript
import { createApp } from 'vue';
import App from './app.vue';

const app = createApp(App);
app.use(TDesignChat);
\`\`\`
`;

const displayText = ref(doc);
const isTyping = ref(false);
const timerRef = ref(null);
const currentIndex = ref(doc.length);
const startTimeRef = ref(Date.now());

const toggleTyping = () => {
  if (currentIndex.value >= doc.length) {
    currentIndex.value = 0;
    displayText.value = '';
  }
  isTyping.value = !isTyping.value;
};

const typeWriter = () => {
  if (!isTyping.value) return;

  if (currentIndex.value < doc.length) {
    const char = doc[currentIndex.value];
    currentIndex.value += 1;
    displayText.value += char;
    console.log('模拟流式输出：displayText==', displayText.value);
    timerRef.value = setTimeout(typeWriter, 10);
  } else {
    isTyping.value = false;
  }
};

// 使用watch监听isTyping的变化
watch(isTyping, (newValue) => {
  // 清理之前的定时器
  if (timerRef.value) {
    clearTimeout(timerRef.value);
    timerRef.value = null;
  }

  if (newValue) {
    // 如果已经完成输入，点击开始则重置
    if (currentIndex.value >= doc.length) {
      currentIndex.value = 0;
      displayText.value = '';
    }
    startTimeRef.value = Date.now();
    // 延迟500ms开始打字效果
    timerRef.value = setTimeout(typeWriter, 500);
  }
});

onMounted(() => {
  const handleResourceClick = (event) => {
    console.log(event.target);
  };
  document.addEventListener('click', handleResourceClick);

  return () => {
    document.removeEventListener('click', handleResourceClick);
  };
});
</script>

<style scoped></style>

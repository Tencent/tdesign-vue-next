<template>
  <ChatMarkdown :content="doc" />
</template>

<script setup lang="ts">
import { ChatMarkdown } from '@tdesign-vue-next/chat';

const doc = `
\`\`\`mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
\`\`\`
  `;
</script>

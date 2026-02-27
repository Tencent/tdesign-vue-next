<template>
  <t-chat-markdown :content="doc" />
</template>

<script setup lang="ts">
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

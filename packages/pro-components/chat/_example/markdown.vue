<template>
  <t-chat-content role="assistant" :content="doc" variant="base"> </t-chat-content>
</template>
<script setup lang="ts">
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
</script>

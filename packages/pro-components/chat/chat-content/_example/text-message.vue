<template>
  <t-chat-content :content="content"></t-chat-content>
</template>
<script setup lang="ts">
const ask = `import TDesign from 'tdesign-vue-next'; // 引入tdesign组件库
app.use(TDesign).use(router).mount('#app');`;

const content = {
  type: 'text',
  data: ask,
};
</script>
<style scoped></style>

<template>
  <t-chat-content :content="ask" variant="base" role="user"></t-chat-content>
</template>
<script setup lang="ts">
const ask = `import TDesign from 'tdesign-vue-next'; // 引入tdesign组件库
app.use(TDesign).use(router).mount('#app');`;
</script>
<style scoped></style>

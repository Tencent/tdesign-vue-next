<template>
  <div class="t-design-scroll-container">
    <ul class="t-design-scroll-content">
      <li v-for="(item, index) of list" :key="item" class="backtop-demo-item">
        {{ index + 1 + '. ' + item }}
      </li>
      <t-back-top target=".t-design-scroll-content" :visible-height="100" bottom="5" right="5"></t-back-top>
    </ul>
  </div>
</template>

<script setup>
const msg = 'TDesign 适配桌面端的组件库，适合在 vue3.x 技术栈项目中使用';
const list = [];
for (let i = 0; i < 20; i++) {
  list.push(msg);
}
</script>

<style scoped>
.t-design-scroll-container {
  width: 600px;
  height: 300px;
  margin-top: 20px;
}

.t-design-scroll-content {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  list-style-type: none;
}

.backtop-demo-item {
  line-height: 35px;
  border-bottom: 1px solid #dfe1e6;
}
</style>

<template>
  <t-list style="height: 300px" :scroll="{ type: 'virtual' }"
    ><t-list-item v-for="(item, index) in listRef" :key="index">
      <t-list-item-meta :image="imageUrl" title="列表标题" :description="item.content" /></t-list-item
  ></t-list>
</template>
<script setup>
import { ref } from 'vue';
const list = [];
const imageUrl = 'https://tdesign.gtimg.com/site/avatar.jpg';
for (let i = 0; i < 3000; i++) {
  list.push({ content: `列表内容的描述性文字` });
}

const listRef = ref(list);
</script>

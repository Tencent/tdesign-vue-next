<template>
  <t-list style="height: 300px" :scroll="{ type: 'virtual' }"
    ><t-list-item v-for="(item, index) in listRef" :key="index"> {{ item.content }}</t-list-item></t-list
  >
</template>
<script setup>
import { ref } from 'vue';
const list = [];
for (let i = 0; i < 10000; i++) {
  list.push({ content: `选项${i + 1}` });
}

const listRef = ref(list);
</script>

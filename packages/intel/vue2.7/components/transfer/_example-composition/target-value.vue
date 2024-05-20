<template>
  <t-transfer :data="list" v-model="targetValue" />
</template>
<script setup>
import { ref } from 'vue';

const initialList = [];
for (let i = 0; i < 20; i++) {
  initialList.push({
    value: i.toString(),
    label: `内容${i + 1}`,
  });
}
const list = ref(initialList);
const targetValue = ref(initialList.map((item) => item.value).filter((v) => parseInt(v, 10) % 2 === 0));
</script>

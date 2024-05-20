<template>
  <t-transfer :data="list" :checked.sync="checked" />
</template>
<script setup>
import { ref } from 'vue';

const initialList = [];
for (let i = 0; i < 20; i++) {
  initialList.push({
    value: i,
    label: `内容${i + 1}`,
    disabled: i % 4 < 1,
  });
}
const list = ref(initialList);
const checked = ref(initialList.map((item) => item.value).filter((v) => v % 2 === 0));
</script>

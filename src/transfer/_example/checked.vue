<template>
  <t-transfer v-model:checked="checked" :data="list" />
</template>
<script setup lang="ts">
import { ref } from 'vue';

type List = { value: number; label: string; disabled: boolean };

const list: List[] = [];

for (let i = 0; i < 20; i++) {
  list.push({
    value: i,
    label: `内容${i + 1}`,
    disabled: i % 4 < 1,
  });
}
const checked = ref(list.map((item) => item.value).filter((v) => v % 2 === 0));
</script>

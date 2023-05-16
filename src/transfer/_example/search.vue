<template>
  <t-transfer v-model="targetValue" theme="primary" :data="list" :search="true" />
</template>
<script setup lang="ts">
import { ref } from 'vue';

type List = { value: string; label: string };

const list: List[] = [];

for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
  });
}

const targetValue = ref([]);
</script>

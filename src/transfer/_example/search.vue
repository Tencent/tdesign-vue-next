<template>
  <div>
    <t-transfer v-model="targetValue" theme="primary" :data="list" :search="true" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
  });
}

const targetValue = ref([]);
</script>

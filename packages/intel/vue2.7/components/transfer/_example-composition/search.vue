<template>
  <t-transfer theme="primary" :data="list" v-model="targetValue" :checked-value="checkedValue" :search="true" />
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
const targetValue = ref([]);
const checkedValue = ref([]);
</script>

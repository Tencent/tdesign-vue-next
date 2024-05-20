<template>
  <div>
    <t-pagination v-model="current" :total="49" :on-change="onChange" :page-size="10" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const current = ref(2);
const onChange = (pageInfo) => {
  console.log(pageInfo);
};
</script>

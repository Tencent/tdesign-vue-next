<template>
  <div>
    <t-pagination v-model="index" disabled show-jumper show-sizer :total="100" :page-size="pageSize" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const index = ref(1);
const pageSize = ref(5);
</script>

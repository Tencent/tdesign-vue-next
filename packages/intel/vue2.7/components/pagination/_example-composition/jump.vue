<template>
  <div>
    <t-pagination v-model="current" :total="101" :page-size.sync="pageSize" show-jumper />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pageSize = ref(20);
const current = ref(1);
</script>

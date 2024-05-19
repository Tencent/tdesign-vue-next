<template>
  <div>
    <t-pagination size="small" :total="100" :page-size.sync="pageSize" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pageSize = ref(5);
</script>

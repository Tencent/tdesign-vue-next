<template>
  <t-pagination theme="simple" size="small" :total="100" :page-size.sync="pageSize" />
</template>

<script setup>
import { ref } from 'vue';

const pageSize = ref(5);
</script>

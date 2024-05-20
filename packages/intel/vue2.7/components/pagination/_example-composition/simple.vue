<template>
  <div>
    <t-pagination theme="simple" :total="100" :page-size.sync="pageSize" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pageSize = ref(5);
</script>

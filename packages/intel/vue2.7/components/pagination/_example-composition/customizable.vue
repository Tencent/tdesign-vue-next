<template>
  <div>
    <t-pagination
      :total="200"
      :page-size.sync="pageSize"
      v-model="current"
      show-jumper
      show-sizer
      :page-size-options="[10, 20, 30, 100, 200]"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pageSize = ref(20);
const current = ref(1);
</script>

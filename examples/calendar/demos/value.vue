<template>
  <p style="margin-bottom: 20px">
    <label>自己指定年：</label>
    <input v-model="year" />

    <label style="margin-left: 10px">自己指定年月：</label>
    <input v-model="month" />
  </p>
  <t-calendar :value="value" :year="year" :month="month" />
</template>

<script setup>
import { ref } from 'vue';

const value = '1998-11-11'; // new Date(1998, 10, 11)
const year = ref(1998);
const month = ref(11);
</script>

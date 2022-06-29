<template>
  <t-jumper :tips="tips" />
</template>

<script setup>
import { ref } from 'vue';

const tips = ref({ prev: '前尘忆梦', current: '回到现在', next: '展望未来' });
</script>

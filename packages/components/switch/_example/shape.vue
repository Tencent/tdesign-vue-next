<template>
  <t-space>
    <t-switch v-model="checked" shape="circle" />
    <t-switch v-model="checked" shape="round" />
    <t-switch v-model="checked" shape="line" />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(true);
</script>

<template>
  <t-space>
    <t-switch v-model="circleChecked" shape="circle" />
    <t-switch v-model="roundChecked" shape="round" />
    <t-switch v-model="lineChecked" shape="line" />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const circleChecked = ref(true);
const roundChecked = ref(true);
const lineChecked = ref(true);
</script>

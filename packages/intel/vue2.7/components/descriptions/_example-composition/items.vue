<template>
  <t-descriptions title="Shipping address" :items="items" :column="3" />
</template>

<script setup lang="jsx">
import { ref } from 'vue';
import Base from './base.vue';

const initialItems = [
  {
    label: 'Name',
    content: 'TDesign',
  },
  {
    label: Base,
    content: '139****0609',
  },
];
const items = ref(initialItems);
</script>

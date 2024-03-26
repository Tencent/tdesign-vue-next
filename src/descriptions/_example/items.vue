<template>
  <t-descriptions title="Shipping address" :items="items" :column="3" />
</template>

<script setup lang="jsx">
const items = [
  { label: 'Name', content: 'TDesign' },
  { label: <button>Telephone Number</button>, content: '139****0609' },
  { label: 'Area', content: <h3>China Tencent Headquarters</h3> },
  { label: () => <i>'Address'</i>, content: () => <mark> 'Shenzhen Penguin Island D1 4A Mail Center'</mark> },
];
</script>

<!-- <template>
  <t-descriptions title="Shipping address" :items="items" />
</template>

<script setup>
import Base from './base.vue';
const items = [
  { label: 'Name', content: 'TDesign' },
  { label: Base, content: '139****0609' },
];
</script> -->

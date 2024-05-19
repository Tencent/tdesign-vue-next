<template>
  <t-descriptions title="Shipping address" :items="items" :column="3" />
</template>

<script lang="jsx">
import Base from './base.vue';

const items = [
  { label: 'Name', content: 'TDesign' },
  { label: Base, content: '139****0609' },
];

export default {
  data() {
    return {
      items,
    };
  },
};
</script>

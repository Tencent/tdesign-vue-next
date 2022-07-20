<template>
  <div>
    <t-search :suggestions="suggestions"></t-search>
  </div>
</template>

<script lang="ts" setup>
const suggestions = [
  {
    value: 'vue',
  },
  {
    value: 'vuex',
  },
  {
    value: 'vue-router',
  },
  {
    value: 'react',
  },
  {
    value: 'redux',
  },
  {
    value: 'react-router',
  },
  {
    value: 't-design',
  },
];
</script>

<style lang="scss" scoped></style>

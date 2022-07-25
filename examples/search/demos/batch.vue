<template>
  <div>
    <t-search batch @search="search"></t-search>
  </div>
</template>

<script lang="ts" setup>
const search = () => {
  console.log('search');
};
</script>

<style lang="scss" scoped></style>

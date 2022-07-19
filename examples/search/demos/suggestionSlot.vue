<template>
  <div>
    <t-search :suggestions="suggestions">
      <template #item="{ item }">
        <div>自定义的展开内容-{{ item.value }}</div>
      </template>
    </t-search>
    <br />
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

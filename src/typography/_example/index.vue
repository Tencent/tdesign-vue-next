<template>
  <t-typography-title>这是大标题</t-typography-title>
  <t-typography-text code mark="red" delete underline strong italic>abc</t-typography-text>
  <t-typography-text keyboard>keyboard</t-typography-text>
  <t-typography-text disabled>disabled</t-typography-text>
  <t-typography-text theme="success">success</t-typography-text>
  <t-typography-paragraph theme="success">success</t-typography-paragraph>
  <t-typography-text :ellipsis="ellipsis"
    >ellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsisellipsis</t-typography-text
  >
</template>

<script setup>
const ellipsis = {
  rows: 2,
  color: 'red',
};
</script>

<style lang="scss" scoped></style>

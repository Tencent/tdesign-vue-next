<template>
  <t-space>
    <t-dropdown :options="options" :max-height="400" :min-column-width="88">
      <t-button variant="text">下拉菜单</t-button>
    </t-dropdown>
  </t-space>
</template>
<script setup lang="ts">
const options = Array.from({ length: 20 }).map((_, k) => ({
  content: `选项${k + 1}`,
  value: k + 1,
}));
</script>

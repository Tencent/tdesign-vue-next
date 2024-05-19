<template>
  <t-space align="center" :separator="separator">
    <t-button variant="text">Text</t-button>
    <t-button variant="text">Text</t-button>
    <t-button variant="text">Text</t-button>
  </t-space>
</template>

<script setup lang="jsx">
const separator = () => <t-divider layout="vertical" />;
</script>

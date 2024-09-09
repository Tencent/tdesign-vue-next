<template>
  <div style="width: 100%">
    <t-typography-text copyable>This is a copyable text.</t-typography-text>
    <br />
    <t-typography-text :copyable="customIconState1">This is a copyable text</t-typography-text>
  </div>
</template>

<script setup lang="tsx">
import { CopyIcon } from 'tdesign-icons-vue-next';

const customIconState1 = {
  suffix: <CopyIcon style={{ color: '#000' }} />,
  tooltipProps: {
    content: 'click to copy',
  },
};
</script>

<style scoped></style>

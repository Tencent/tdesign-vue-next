<template>
  <div style="width: 100%">
    <t-typography-text copyable>This is a copyable text.</t-typography-text>
    <br />
    <t-typography-text
      :copyable="{
        tooltipProps: {
          content: 'click to copy the text',
        },
      }"
      >This is a copyable text.</t-typography-text
    >
    <br />
    <t-typography-text :copyable="copyableConfig">This is a copyable text.</t-typography-text>
  </div>
</template>

<script setup lang="tsx">
import { SmileIcon } from 'tdesign-icons-vue-next';

const copyableConfig = {
  suffix: <SmileIcon />,
  tooltipProps: {
    content: 'click to copy the text',
  },
};
</script>

<style scoped></style>

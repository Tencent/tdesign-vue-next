<template>
  <div>
    <t-typography-paragraph>
      <!-- <t-typography-text > This is an editable copy.</t-typography-text> -->
    </t-typography-paragraph>

    <t-typography-paragraph>
      <t-typography-text copyable>This is a copyable text.</t-typography-text>
    </t-typography-paragraph>
    <t-typography-paragraph>
      <!-- <t-typography-text>This is editable text for custom icons.</t-typography-text> -->
    </t-typography-paragraph>
    <t-typography-paragraph>
      <!-- <t-typography-text>This is an editable copy.</t-typography-text> -->
    </t-typography-paragraph>
    <t-typography-paragraph>
      <t-typography-text :copyable="customIconState1">This is a copyable text.</t-typography-text>
    </t-typography-paragraph>
    <t-typography-paragraph>
      <!-- <t-typography-text>This is editable text for custom icons.</t-typography-text> -->
    </t-typography-paragraph>
    <t-typography-paragraph>
      <!-- <t-typography-text>This is an editable copy.</t-typography-text> -->
    </t-typography-paragraph>
    <t-typography-paragraph>
      <!-- <t-typography-text>This is an editable copy.</t-typography-text> -->
    </t-typography-paragraph>
  </div>
</template>

<script setup lang="tsx">
import { CopyIcon } from 'tdesign-icons-vue-next';

const customIconState1 = {
  suffix: <CopyIcon style={{ color: '#000' }} />,
};
</script>

<style scoped></style>

<template>
  <t-space direction="vertical">
    <t-date-picker clearable :prefix-icon="renderPrefixIcon">
      <template #suffixIcon>
        <lock-on-icon />
      </template>
    </t-date-picker>
  </t-space>
</template>

<script setup lang="jsx">
import { ref } from 'vue';
import { BrowseIcon, LockOnIcon } from 'tdesign-icons-vue';

const renderPrefixIcon = ref(() => <BrowseIcon />);
</script>

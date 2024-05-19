<template>
  <t-space direction="vertical">
    <t-date-picker clearable :prefix-icon="renderPrefixIcon">
      <template #suffixIcon>
        <lock-on-icon />
      </template>
    </t-date-picker>
    <t-date-range-picker clearable :prefix-icon="renderPrefixIcon">
      <template #suffixIcon>
        <lock-on-icon />
      </template>
    </t-date-range-picker>
  </t-space>
</template>

<script setup lang="jsx">
import { BrowseIcon, LockOnIcon } from 'tdesign-icons-vue-next';

const renderPrefixIcon = () => <BrowseIcon />;
</script>

<template>
  <t-space direction="vertical">
    <t-input type="password" default-value="520 TDesign">
      <template #prefix-icon>
        <lock-on-icon />
      </template>
    </t-input>
    <!-- 使用 function 的形式定义 icon -->
    <t-input type="password" default-value="520 TDesign" :prefix-icon="renderPrefixIcon" />
  </t-space>
</template>
<script setup lang="jsx">
import { LockOnIcon } from 'tdesign-icons-vue-next';

const renderPrefixIcon = () => <LockOnIcon />;
</script>

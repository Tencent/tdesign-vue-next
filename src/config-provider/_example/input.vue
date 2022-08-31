<template>
  <t-config-provider :global-config="globalConfig">
    <t-input type="password" default-value="520 TDesign" />
  </t-config-provider>
</template>

<script setup>
import { LockOnIcon, LockOffIcon } from 'tdesign-icons-vue-next';

// 支持全局定义 icon
const globalConfig = {
  icon: {
    BrowseOffIcon: LockOnIcon,
    BrowseIcon: LockOffIcon,
  },
};
</script>

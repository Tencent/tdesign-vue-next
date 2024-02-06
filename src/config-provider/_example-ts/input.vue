<template>
  <t-config-provider :global-config="globalConfig">
    <t-input type="password" default-value="520 TDesign" />
  </t-config-provider>
</template>

<script lang="ts" setup>
import { GlobalConfigProvider } from 'tdesign-vue-next';
import { LockOnIcon, LockOffIcon } from 'tdesign-icons-vue-next';

// 支持全局定义 icon
const globalConfig: GlobalConfigProvider = {
  icon: {
    // @ts-ignore TODO
    BrowseOffIcon: LockOnIcon,
    // @ts-ignore TODO
    BrowseIcon: LockOffIcon,
  },
};
</script>

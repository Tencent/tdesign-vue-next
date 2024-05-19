<template>
  <t-config-provider :globalConfig="globalConfig">
    <t-input type="password" default-value="520 TDesign" />
  </t-config-provider>
</template>

<script setup>
import { reactive } from 'vue';
import { LockOnIcon, LockOffIcon } from 'tdesign-icons-vue';

const globalConfig = reactive({
  icon: {
    BrowseOffIcon: LockOnIcon,
    BrowseIcon: LockOffIcon,
  },
});
</script>

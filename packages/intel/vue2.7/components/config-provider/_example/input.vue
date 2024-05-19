<template>
  <t-config-provider :globalConfig="globalConfig">
    <t-input type="password" default-value="520 TDesign" />
  </t-config-provider>
</template>

<script>
import { LockOnIcon, LockOffIcon } from 'tdesign-icons-vue';

export default {
  data() {
    return {
      globalConfig: {
        icon: {
          BrowseOffIcon: LockOnIcon,
          BrowseIcon: LockOffIcon,
        },
      },
    };
  },
};
</script>

<template>
  <t-space direction="vertical">
    <t-date-picker clearable :prefix-icon="renderPrefixIcon">
      <template #suffixIcon>
        <lock-on-icon />
      </template>
    </t-date-picker>
  </t-space>
</template>

<script lang="jsx">
import { BrowseIcon, LockOnIcon } from 'tdesign-icons-vue';

export default {
  components: {
    LockOnIcon,
  },
  data() {
    return {
      renderPrefixIcon: () => <BrowseIcon />,
    };
  },
};
</script>

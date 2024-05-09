<template>
  <t-space :size="40">
    <t-avatar :icon="icon" />
    <t-avatar :image="image" :hide-on-load-failed="false" />
    <t-avatar>W</t-avatar>
  </t-space>
</template>
<script setup lang="jsx">
import { computed } from 'vue';

import { UserIcon } from 'tdesign-icons-vue-next';

const icon = computed(() => () => <UserIcon />);
const image = 'https://tdesign.gtimg.com/site/avatar.jpg';
</script>

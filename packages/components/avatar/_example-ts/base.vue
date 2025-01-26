<template>
  <t-space :size="40">
    <t-avatar :icon="icon" />
    <t-avatar :image="image" :hide-on-load-failed="false" />
    <t-avatar>W</t-avatar>
  </t-space>
</template>
<script lang="tsx" setup>
import { computed } from 'vue';
import { AvatarProps } from 'tdesign-vue-next';
import { UserIcon } from 'tdesign-icons-vue-next';
const icon = computed<AvatarProps['icon']>(() => () => <UserIcon />);
const image: AvatarProps['image'] = 'https://tdesign.gtimg.com/site/avatar.jpg';
</script>

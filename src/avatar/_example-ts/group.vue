<template>
  <t-space class="demo-avatar" direction="vertical" :size="40">
    <t-avatar-group>
      <t-avatar :image="image" />
      <t-avatar>W</t-avatar>
      <t-avatar :icon="icon" />
    </t-avatar-group>

    <t-avatar-group size="large">
      <t-avatar :image="image" />
      <t-avatar>W</t-avatar>
      <t-avatar :icon="icon" />
    </t-avatar-group>
  </t-space>
</template>
<script lang="tsx" setup>
import { AvatarProps } from 'tdesign-vue-next';
import { UserIcon } from 'tdesign-icons-vue-next';
const icon: AvatarProps['icon'] = () => <UserIcon />;
const image: AvatarProps['image'] = 'https://tdesign.gtimg.com/site/avatar.jpg';
</script>

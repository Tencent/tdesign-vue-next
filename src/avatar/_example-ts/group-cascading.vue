<template>
  <t-space direction="vertical" :size="40">
    <div class="demo-avatar-block">
      <t-avatar-group>
        <t-avatar :image="image" />
        <t-avatar>W</t-avatar>
        <t-avatar :icon="icon" />
      </t-avatar-group>
    </div>

    <div class="demo-avatar-block">
      <t-avatar-group cascading="left-up">
        <t-avatar :image="image" />
        <t-avatar>W</t-avatar>
        <t-avatar :icon="icon" />
      </t-avatar-group>
    </div>
  </t-space>
</template>
<script lang="tsx" setup>
import { AvatarProps } from 'tdesign-vue-next';
import { UserIcon } from 'tdesign-icons-vue-next';
const icon: AvatarProps['icon'] = () => <UserIcon />;
const image: AvatarProps['image'] = 'https://tdesign.gtimg.com/site/avatar.jpg';
</script>

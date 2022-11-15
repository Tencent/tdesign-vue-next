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
<script setup lang="jsx">
import { UserIcon } from 'tdesign-icons-vue-next';

const icon = () => <UserIcon />;
const image = 'https://tdesign.gtimg.com/site/avatar.jpg';
</script>

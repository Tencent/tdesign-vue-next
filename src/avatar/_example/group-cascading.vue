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
<script setup lang="jsx">
import { UserIcon } from 'tdesign-icons-vue-next';

const icon = () => <UserIcon />;
const image = 'https://tdesign.gtimg.com/site/avatar.jpg';
</script>

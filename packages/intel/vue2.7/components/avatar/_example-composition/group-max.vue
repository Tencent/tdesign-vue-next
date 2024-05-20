<template>
  <t-space direction="vertical">
    <t-space break-line>
      <t-avatar-group size="large" :max="2">
        <t-avatar :image="image"></t-avatar>
        <t-avatar>Avatar</t-avatar>
        <t-avatar :image="image"></t-avatar>
      </t-avatar-group>
    </t-space>
    <t-space break-line>
      <t-avatar-group size="large" :max="2" :collapseAvatar="ellipsisIcon">
        <t-avatar :image="image"></t-avatar>
        <t-avatar>Avatar</t-avatar>
        <t-avatar :icon="icon"></t-avatar>
      </t-avatar-group>
    </t-space>
    <t-space break-line>
      <t-avatar-group size="large" :max="2" collapseAvatar="more">
        <t-avatar :image="image"></t-avatar>
        <t-avatar>Avatar</t-avatar>
        <t-avatar :icon="icon"></t-avatar>
      </t-avatar-group>
    </t-space>
  </t-space>
</template>
<script setup lang="jsx">
import { ref, computed } from 'vue';
import { UserIcon, EllipsisIcon } from 'tdesign-icons-vue';

const image = ref('https://tdesign.gtimg.com/site/avatar.jpg');
const ellipsisIcon = computed(() => () => <EllipsisIcon />);
const icon = computed(() => () => <UserIcon />);
</script>

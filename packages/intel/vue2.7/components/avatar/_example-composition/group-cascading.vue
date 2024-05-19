<template>
  <t-space direction="vertical">
    <t-space break-line>
      <t-avatar-group>
        <t-avatar :image="image"></t-avatar>
        <t-avatar>W</t-avatar>
        <t-avatar :icon="icon"></t-avatar>
      </t-avatar-group>
    </t-space>

    <t-space break-line>
      <t-avatar-group cascading="left-up">
        <t-avatar :image="image"></t-avatar>
        <t-avatar>W</t-avatar>
        <t-avatar :icon="icon"></t-avatar>
      </t-avatar-group>
    </t-space>
  </t-space>
</template>
<script setup lang="jsx">
import { ref, computed } from 'vue';
import { UserIcon } from 'tdesign-icons-vue';

const image = ref('https://tdesign.gtimg.com/site/avatar.jpg');
const icon = computed(() => () => <UserIcon />);
</script>

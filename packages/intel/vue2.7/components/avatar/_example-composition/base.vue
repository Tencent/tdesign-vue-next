<template>
  <t-space size="large">
    <t-avatar :icon="icon"></t-avatar>
    <t-avatar :image="image" :hideOnLoadFailed="false" @error="onError"></t-avatar>
    <t-avatar>W</t-avatar>
  </t-space>
</template>
<script setup lang="jsx">
import { ref, computed } from 'vue';
import { UserIcon } from 'tdesign-icons-vue';

const image = ref('https://tdesign.gtimg.com/site/avatar.jpg');
const icon = computed(() => () => <UserIcon />);
const onError = (params) => {
  console.log(params);
};
</script>

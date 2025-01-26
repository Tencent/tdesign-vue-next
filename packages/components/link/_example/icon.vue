<template>
  <t-space>
    <t-link theme="default" :prefix-icon="renderPrefixIcon" :on-click="clickLink"> 跳转链接 </t-link>
    <t-link theme="primary" underline href="https://tdesign.tencent.com/" target="_self">
      <template #prefix-icon>
        <link-icon />
      </template>
      跳转链接
    </t-link>
    <t-link theme="danger" hover="color" href="https://tdesign.tencent.com/" target="_blank" @click="clickLink">
      <template #suffix-icon>
        <jump-icon />
      </template>
      跳转链接
    </t-link>
    <t-link theme="warning" :suffix-icon="renderSuffixIcon" disabled> 跳转链接 </t-link>
  </t-space>
</template>
<script setup lang="jsx">
import { LinkIcon, JumpIcon } from 'tdesign-icons-vue-next';

const renderPrefixIcon = () => <LinkIcon />;
const renderSuffixIcon = () => <JumpIcon />;
const clickLink = () => {
  console.log('不触发');
};
</script>

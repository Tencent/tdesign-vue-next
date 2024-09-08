<template>
  <t-space>
    <t-link theme="default" disabled @click="clickLink"> 跳转链接 </t-link>
    <t-link theme="primary" underline disabled @click="clickLink"> 跳转链接 </t-link>
    <t-link theme="danger" hover="color" disabled @click="clickLink"> 跳转链接 </t-link>
    <t-link theme="warning" hover="underline" disabled :on-click="clickLink"> 跳转链接 </t-link>
    <t-link theme="success" disabled @click="clickLink">
      <template #suffixIcon>
        <jump-icon />
      </template>
      跳转链接
    </t-link>
  </t-space>
</template>
<script setup lang="jsx">
import { JumpIcon } from 'tdesign-icons-vue-next';

const clickLink = () => {
  console.log('不触发');
};
</script>

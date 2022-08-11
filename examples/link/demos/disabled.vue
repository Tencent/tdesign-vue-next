<template>
  <div class="tdesign-demo-block-column">
    <t-space>
      <t-link theme="default" disabled @click="clickLink"> 跳转链接 </t-link>
      <t-link theme="primary" underline disabled @click="clickLink"> 跳转链接 </t-link>
      <t-link theme="danger" hover="color" disabled @click="clickLink"> 跳转链接 </t-link>
      <t-link theme="warning" hover="underline" disabled @click="clickLink"> 跳转链接 </t-link>
      <t-link theme="success" disabled @click="clickLink">
        <template #suffix-icon>
          <JumpIcon />
        </template>
        跳转链接
      </t-link>
    </t-space>
  </div>
</template>

<script setup>
import { LinkIcon, JumpIcon } from 'tdesign-icons-vue-next';

const clickLink = () => {
  console.log('不触发');
};
</script>

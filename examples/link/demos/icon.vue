<template>
  <div class="tdesign-demo-block-column">
    <t-space>
      <t-link theme="default">
        <template #suffix-icon>
          <JumpIcon />
        </template>
        跳转链接
      </t-link>
      <t-link theme="primary" underline href="https://tdesign.tencent.com/" target="_self">
        <template #prefix-icon>
          <link-icon />
        </template>
        跳转链接
      </t-link>
      <t-link theme="danger" hover="color" href="https://tdesign.tencent.com/" target="_blank">
        <template #suffix-icon>
          <JumpIcon />
        </template>
        跳转链接
      </t-link>
      <t-link theme="warning" disabled>
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
</script>

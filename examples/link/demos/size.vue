<template>
  <div class="tdesign-demo-block-column">
    <t-space>
      <t-link theme="default" size="small"> 跳转链接 </t-link>
      <t-link theme="primary" size="small"> 跳转链接 </t-link>
      <t-link theme="danger" size="small"> 跳转链接 </t-link>
      <t-link theme="warning" size="small" disabled>跳转链接</t-link>
      <t-link theme="success" size="small">
        <template #suffix-icon>
          <JumpIcon />
        </template>
        跳转链接
      </t-link>
    </t-space>
    <t-space>
      <t-link theme="default" size="medium"> 跳转链接 </t-link>
      <t-link theme="primary" size="medium"> 跳转链接 </t-link>
      <t-link theme="danger" size="medium"> 跳转链接 </t-link>
      <t-link theme="warning" size="medium" disabled>跳转链接</t-link>
      <t-link theme="success" size="medium">
        <template #suffix-icon>
          <JumpIcon />
        </template>
        跳转链接
      </t-link>
    </t-space>
    <t-space>
      <t-link theme="default" size="large"> 跳转链接 </t-link>
      <t-link theme="primary" size="large"> 跳转链接 </t-link>
      <t-link theme="danger" size="large"> 跳转链接 </t-link>
      <t-link theme="warning" size="large" disabled>跳转链接</t-link>
      <t-link theme="success" size="large">
        <template #suffix-icon>
          <JumpIcon />
        </template>
        跳转链接
      </t-link>
    </t-space>
  </div>
</template>

<script setup>
import { LinkIcon } from 'tdesign-icons-vue-next';
</script>

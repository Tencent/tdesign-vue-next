<template>
  <t-space align="center" size="large">
    <t-badge dot :count="2">
      <div class="badge-block" />
    </t-badge>
    <t-badge dot :count="99"> 解锁新徽章 </t-badge>
    <t-badge dot :count="100">
      <user-icon size="24" />
    </t-badge>
  </t-space>
</template>

<script lang="tsx" setup>
import { UserIcon } from 'tdesign-icons-vue-next';
</script>

<style>
.badge-block {
  width: 40px;
  height: 40px;
  background: #eeeeee;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 3px;
}
</style>

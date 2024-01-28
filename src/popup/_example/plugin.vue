<template>
  <t-space size="large">
    <t-button variant="outline" class="trigger-element1" @click="handleElement1">已渲染的节点1</t-button>
  </t-space>
</template>

<script setup lang="jsx">
import { PopupPlugin } from 'tdesign-vue-next';

function handleElement1() {
  PopupPlugin('.trigger-element1', '渲染文本内容', {
    placement: 'bottom',
    showArrow: true,
    trigger: 'hover',
    destroyOnClose: true,
  });
}
</script>

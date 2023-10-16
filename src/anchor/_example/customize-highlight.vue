<template>
  <t-space>
    <div class="flex: 1"></div>
    <t-button @click="() => testClick('#不同尺寸的锚点')">#不同尺寸的锚点</t-button>
    <t-button @click="() => testClick('#特定交互锚点')">#特定交互锚点</t-button>
    <t-anchor :bounds="150" :get-current-anchor="getCurrentAnchor" @click="handleClick">
      <t-anchor-item href="#基础锚点" title="基础锚点"></t-anchor-item>
      <t-anchor-item href="#多级锚点" title="多级锚点"></t-anchor-item>
      <t-anchor-item href="#指定容器锚点" title="指定容器锚点"></t-anchor-item>
      <t-anchor-item href="#特定交互锚点" title="特定交互锚点"></t-anchor-item>
      <t-anchor-item href="#不同尺寸的锚点" title="不同尺寸的锚点"></t-anchor-item>
      <t-anchor-item href="#自定义锚点高亮" title="自定义锚点高亮" />
    </t-anchor>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const getCurrentAnchor = ref((oldHref) => {
  // return oldHref || '#不同尺寸的锚点';
  return '#不同尺寸的锚点';
});

const testClick = (href) => {
  getCurrentAnchor.value = () => href;
};

const handleClick = (link) => {
  console.log('link', link);
};
</script>

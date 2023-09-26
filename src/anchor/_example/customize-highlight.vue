<template>
  <t-space>
    <div class="flex: 1"></div>
    <t-button @click="() => testClick('#基础锚点')">#基础锚点</t-button>
    <t-button @click="() => testClick('#特定交互锚点')">#特定交互锚点</t-button>
    <t-anchor :bounds="150" :get-current-anchor="getCurrentAnchor" @click="handleClick">
      <t-anchor-item href="#基础锚点" title="基础锚点"></t-anchor-item>
      <t-anchor-item href="#多级锚点" title="多级锚点"></t-anchor-item>
      <t-anchor-item href="#指定容器锚点" title="指定容器锚点"></t-anchor-item>
      <t-anchor-item href="#特定交互锚点" title="特定交互锚点"></t-anchor-item>
      <t-anchor-item href="#尺寸" title="尺寸">
        <t-anchor-item href="#size-2" title="尺寸2">
          <t-anchor-item href="#size-3" title="尺寸1"></t-anchor-item>
        </t-anchor-item>
      </t-anchor-item>
    </t-anchor>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const getCurrentAnchor = ref((oldHref) => {
  return oldHref || '#尺寸';
  // return '#尺寸';
});

const testClick = (href) => {
  getCurrentAnchor.value = () => href;
};

const handleClick = (link) => {
  console.log('link', link);
};
</script>

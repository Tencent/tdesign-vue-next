<template>
  <t-menu v-model="value" theme="light" width="200px">
    <template #logo>
      <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" />
    </template>
    <t-menu-item value="item1">菜单内容</t-menu-item>
    <t-menu-item value="item2">菜单内容</t-menu-item>
    <t-menu-item value="item3">菜单内容</t-menu-item>
    <t-menu-item value="item4">菜单内容</t-menu-item>
  </t-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref('item2');
</script>

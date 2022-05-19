<template>
  <t-menu v-model="value" theme="light" width="200px" height="550px">
    <template #logo>
      <img
        width="136"
        class="t-menu__logo--center"
        src="https://www.tencent.com/img/index/menu_logo_hover.png"
        alt="logo"
      />
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

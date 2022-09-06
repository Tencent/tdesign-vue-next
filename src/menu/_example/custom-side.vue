<template>
  <t-menu theme="light" default-value="item2">
    <template #logo>
      <img width="136" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
    </template>
    <t-menu-item value="item1">菜单内容</t-menu-item>
    <t-menu-item value="item2">菜单内容</t-menu-item>
    <t-menu-item value="item3">菜单内容</t-menu-item>
    <t-menu-item value="item4" :disabled="true">禁用菜单</t-menu-item>
  </t-menu>
</template>

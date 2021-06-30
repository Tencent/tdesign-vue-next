<template>
  <t-head-menu theme="dark" value="item2">
    <template #logo>
      <img width="136" class="t-menu__logo--center" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo">
    </template>
    <t-menu-item value="item1">111菜单内容一</t-menu-item>
    <t-menu-item value="item2">已选内容</t-menu-item>
    <t-menu-item value="item3">菜单内容二</t-menu-item>
    <t-menu-item value="item4" :disabled="true">菜单内容三</t-menu-item>
    <template #options>
      <a href="javascript:;"><t-icon name="search"/></a>
      <a href="javascript:;"><t-icon name="notification-filled"/></a>
      <a href="javascript:;"><t-icon name="home"/></a>
    </template>
    <template #submenu>
      <t-submenu>
        <t-menu-item value="submenu1">菜单内容一</t-menu-item>
        <t-menu-item value="submenu2">菜单内容二</t-menu-item>
        <t-menu-item value="submenu3">菜单内容三</t-menu-item>
        <t-menu-item value="submenu4">菜单内容四</t-menu-item>
      </t-submenu>
    </template>
  </t-head-menu>
</template>

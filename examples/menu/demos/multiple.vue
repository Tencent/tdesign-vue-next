<template>
  <t-head-menu active="1-1" mode="dropdown">
    <template #logo>
      <img width="136" class="t-menu__logo--center" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo">
    </template>
    <t-submenu name="1">
      <template #title>
        <span>菜单1</span>
      </template>
      <t-menu-item name="1-1">子菜单1-1</t-menu-item>
      <t-menu-item name="1-2">子菜单1-2</t-menu-item>
      <t-menu-item name="1-3">子菜单1-3</t-menu-item>
    </t-submenu>
    <t-submenu name="2">
      <template #title>
        <span>菜单2</span>
      </template>
      <t-menu-item name="2-1">子菜单2-1</t-menu-item>
      <t-menu-item name="2-2">子菜单2-2</t-menu-item>
      <t-menu-item name="2-3">子菜单2-3</t-menu-item>
    </t-submenu>
    <template #options>
      <div>
        <a href="javascript:;"><t-icon name="search"/></a>
        <a href="javascript:;"><t-icon name="notification-filled"/></a>
        <a href="javascript:;"><t-icon name="home"/></a>
      </div>
    </template>
  </t-head-menu>
</template>

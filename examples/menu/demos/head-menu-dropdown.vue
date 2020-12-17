<template>
  <t-head-menu active="1-1" mode="dropdown">
    <img slot="logo" width="136" class="t-menu__logo--center" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo">
    <t-submenu name="1">
      <span slot="title">菜单1</span>
      <t-menu-item name="1-1">子菜单1-1</t-menu-item>
      <t-menu-item name="1-2">子菜单1-2</t-menu-item>
      <t-menu-item name="1-3">子菜单1-3</t-menu-item>
    </t-submenu>
    <t-submenu name="2">
      <span slot="title">菜单2</span>
      <t-menu-item name="2-1">子菜单2-1</t-menu-item>
      <t-menu-item name="2-2">子菜单2-2</t-menu-item>
      <t-menu-item name="2-3">子菜单2-3</t-menu-item>
    </t-submenu>
    <div slot="options">
      <a href="javascript:;"><t-icon name="search"/></a>
      <a href="javascript:;"><t-icon name="notification-filled"/></a>
      <a href="javascript:;"><t-icon name="home"/></a>
    </div>
  </t-head-menu>
</template>

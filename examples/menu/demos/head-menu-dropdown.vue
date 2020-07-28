<template>
  <t-head-menu active="1-1" mode="dropdown">
    <img slot="logo" class="t-menu__logo--center" src="https://main.qcloudimg.com/raw/9fe1217de2bd7eb623f70648a046e341/head-logo.png" alt="logo">
    <t-submenu name="1" mode="dropdown">
      <span slot="title">菜单1</span>
      <t-menu-item name="1-1">子菜单1</t-menu-item>
      <t-menu-item name="1-2">子菜单2</t-menu-item>
      <t-menu-item name="1-3">子菜单3</t-menu-item>
    </t-submenu>
    <t-submenu name="2" mode="dropdown">
      <span slot="title">菜单2</span>
      <t-menu-item name="2-1">子菜单1</t-menu-item>
      <t-menu-item name="2-2">子菜单2</t-menu-item>
      <t-menu-item name="2-3">子菜单3</t-menu-item>
    </t-submenu>
    <div slot="options">
      <a href="javascript:;"><i class="t-icon t-icon-demo"></i></a>
      <a href="javascript:;"><i class="t-icon t-icon-demo"></i></a>
      <a href="javascript:;"><i class="t-icon t-icon-demo"></i></a>
    </div>
  </t-head-menu>
</template>

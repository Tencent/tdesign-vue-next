<template>
  <t-head-menu theme="dark" active="item2" mode="tile">
    <img slot="logo" class="t-menu__logo--center" src="https://main.qcloudimg.com/raw/4927884bb0c43e726c5915d5bef49ef3/head-logo-dark.png" alt="logo">
    <t-menu-item name="item1">菜单内容一</t-menu-item>
    <t-menu-item name="item2">已选内容</t-menu-item>
    <t-menu-item name="item3">菜单内容二</t-menu-item>
    <t-menu-item name="item4" :disabled="true">菜单内容三</t-menu-item>
    <div slot="options">
      <a href="javascript:;"><i class="t-icon t-icon-demo"></i></a>
      <a href="javascript:;"><i class="t-icon t-icon-demo"></i></a>
      <a href="javascript:;"><i class="t-icon t-icon-demo"></i></a>
    </div>
    <t-submenu slot="submenu">
      <t-menu-item name="submenu1">菜单内容一</t-menu-item>
      <t-menu-item name="submenu2">菜单内容二</t-menu-item>
      <t-menu-item name="submenu3">菜单内容三</t-menu-item>
      <t-menu-item name="submenu4">菜单内容四</t-menu-item>
    </t-submenu>
  </t-head-menu>
</template>

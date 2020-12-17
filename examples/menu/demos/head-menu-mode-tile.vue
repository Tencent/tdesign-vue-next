<template>
  <t-head-menu theme="dark" active="item2" mode="tile">
    <img slot="logo" width="136" class="t-menu__logo--center" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo">
    <t-menu-item name="item1">菜单内容一</t-menu-item>
    <t-menu-item name="item2">已选内容</t-menu-item>
    <t-menu-item name="item3">菜单内容二</t-menu-item>
    <t-menu-item name="item4" :disabled="true">菜单内容三</t-menu-item>
    <div slot="options">
      <a href="javascript:;"><t-icon name="search"/></a>
      <a href="javascript:;"><t-icon name="notification-filled"/></a>
      <a href="javascript:;"><t-icon name="home"/></a>
    </div>
    <t-submenu slot="submenu" mode="tile">
      <t-menu-item name="submenu1">菜单内容一</t-menu-item>
      <t-menu-item name="submenu2">菜单内容二</t-menu-item>
      <t-menu-item name="submenu3">菜单内容三</t-menu-item>
      <t-menu-item name="submenu4">菜单内容四</t-menu-item>
    </t-submenu>
  </t-head-menu>
</template>

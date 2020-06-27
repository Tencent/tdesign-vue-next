<template>
  <t-menu theme="light" active="2-1" :collapsed="true" height="550px">
    <img slot="logo" class="t-menu__logo" src="https://main.qcloudimg.com/raw/9fe1217de2bd7eb623f70648a046e341/head-logo.png" alt="logo">
    <t-menu-item name="item1">
      <t-icon slot="icon" icon="user"/>菜单内容一
    </t-menu-item>
    <t-submenu name="2">
      <t-icon slot="icon" icon="user" />
      <span slot="title">侧边内容二</span>
      <t-menu-item name="2-1">菜单内容一</t-menu-item>
      <t-menu-item name="2-2">菜单内容二</t-menu-item>
      <t-menu-item name="2-3">菜单内容三</t-menu-item>
    </t-submenu>
    <t-menu-item name="item3"><t-icon slot="icon" icon="user" />菜单内容二</t-menu-item>
    <t-menu-item name="item4" :disabled="true"><t-icon slot="icon" icon="user" />菜单内容三</t-menu-item>
    <div slot="options">
      <a href="javascript:;"><i class="t-icon t-icon-demo"></i></a>
      <a href="javascript:;"><i class="t-icon t-icon-demo"></i></a>
      <a href="javascript:;"><i class="t-icon t-icon-demo"></i></a>
    </div>
  </t-menu>
</template>

<template>
  <t-head-menu theme="dark" active="item1">
    <template #logo>
      <img width="136" class="t-menu__logo--center" src="https://www.tencent.com/img/index/menu_logo.png" alt="logo">
    </template>
    <t-menu-item name="item1">已选内容</t-menu-item>
    <t-menu-item name="item2">菜单内容一</t-menu-item>
    <t-menu-item name="item3">菜单内容二</t-menu-item>
    <t-menu-item name="item4" :disabled="true">菜单内容三</t-menu-item>\
    <template #options>
      <div >
        <a href="javascript:;"><t-icon name="search"/></a>
        <a href="javascript:;"><t-icon name="notification-filled"/></a>
        <a href="javascript:;"><t-icon name="home"/></a>
      </div>
    </template>
  </t-head-menu>
</template>

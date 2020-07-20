<template>
  <t-head-menu theme="dark" active="item2" mode="tile">
    <img slot="logo" class="t-menu__logo--center" src="https://main.qcloudimg.com/raw/4927884bb0c43e726c5915d5bef49ef3/head-logo-dark.png" alt="logo">
    <t-menu-item name="item1">菜单内容一</t-menu-item>
    <t-menu-item name="item2">
      已选内容
      <div class="t-head-menu__inner t-head-submenu">
        <ul class="t-menu">
          <li class="t-menu__item">内容列表</li>
          <li class="t-menu__item t-is-active">已选内容</li>
          <li class="t-menu__item">内容列表</li>
          <li class="t-menu__item">内容列表</li>
          <li class="t-menu__item">内容列表</li>
          <li class="t-menu__item">内容列表</li>
        </ul>
      </div>
    </t-menu-item>
    <t-menu-item name="item3">菜单内容二</t-menu-item>
    <t-menu-item name="item4" :disabled="true">菜单内容三</t-menu-item>
    <div slot="options">
      <a href="javascript:;"><i class="t-icon t-icon-demo"></i></a>
      <a href="javascript:;"><i class="t-icon t-icon-demo"></i></a>
      <a href="javascript:;"><i class="t-icon t-icon-demo"></i></a>
    </div>
  </t-head-menu>
</template>

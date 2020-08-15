<template>
  <t-menu theme="light" active="2-1" height="550px" :collapsed="collapsed">
    <img slot="logo" class="t-menu__logo" src="https://main.qcloudimg.com/raw/9fe1217de2bd7eb623f70648a046e341/head-logo.png" alt="logo">
    <t-menu-item name="item1">
      <t-icon slot="icon" name="user"/>菜单内容一
    </t-menu-item>
    <t-submenu name="2" mode="popup">
      <t-icon slot="icon" name="user" />
      <span slot="title">侧边内容二</span>
      <t-menu-item name="2-1">子菜单内容一</t-menu-item>
      <t-menu-item name="2-2">子菜单内容二</t-menu-item>
      <t-menu-item name="2-3">子菜单内容三</t-menu-item>
    </t-submenu>
    <t-submenu name="3" mode="popup">
      <t-icon slot="icon" name="user" />
      <span slot="title">侧边内容三</span>
      <t-menu-item name="3-1">子菜单内容一</t-menu-item>
      <t-menu-item name="3-2">子菜单内容二</t-menu-item>
      <t-menu-item name="3-3">子菜单内容三</t-menu-item>
    </t-submenu>
    <t-menu-item name="item4" :disabled="disabled">
      <t-icon slot="icon" name="user" />菜单内容四
    </t-menu-item>
    <div slot="options">
      <t-icon name="user" @click.native="changeCollapsed" />
    </div>
  </t-menu>
</template>

<script>
export default {
  data() {
    return {
      disabled: true,
      collapsed: false,
    };
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

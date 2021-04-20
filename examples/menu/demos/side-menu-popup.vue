<template>
  <t-menu theme="light" active="2-1" height="550px" :collapsed="collapsed">
    <template #logo>
      <img width="136" class="t-menu__logo--center" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo">
    </template>
    <t-menu-item name="item1">
      <template #icon>
        <t-icon name="user"/>菜单内容一
      </template>
    </t-menu-item>
    <t-submenu name="2" mode="popup">
      <template #icon>
        <t-icon name="user" />
      </template>
      <template #title>
        <span >侧边内容二</span>
      </template>
      <t-menu-item name="2-1">子菜单内容一</t-menu-item>
      <t-menu-item name="2-2">子菜单内容二</t-menu-item>
      <t-menu-item name="2-3">子菜单内容三</t-menu-item>
    </t-submenu>
    <t-submenu name="3" mode="popup">
      <template #icon>
        <t-icon name="user" />
      </template>
      <template #title>
        <span >侧边内容三</span>
      </template>
      <t-menu-item name="3-1">子菜单内容一</t-menu-item>
      <t-menu-item name="3-2">子菜单内容二</t-menu-item>
      <t-menu-item name="3-3">子菜单内容三</t-menu-item>
    </t-submenu>
    <t-menu-item name="item4" :disabled="disabled">
      <template #icon>
        <t-icon name="user" />菜单内容四
      </template>
    </t-menu-item>
    <template #options>
      <div >
        <t-icon name="user" @click="changeCollapsed" />
      </div>
    </template>
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

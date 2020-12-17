<template>
  <t-menu theme="light" active="2-1" :collapsed="collapsed" height="550px">
    <span slot="logo">LOGO</span>
    <t-menu-item name="item1">
      <t-icon slot="icon" name="user"/>菜单内容一
    </t-menu-item>
    <t-submenu name="2" mode="popup">
      <t-icon slot="icon" name="user" />
      <span slot="title">侧边内容二</span>
      <t-menu-item name="2-1">菜单内容一</t-menu-item>
      <t-menu-item name="2-2">菜单内容二</t-menu-item>
      <t-menu-item name="2-3">菜单内容三</t-menu-item>
    </t-submenu>
    <t-menu-item name="item3"><t-icon slot="icon" name="user" />菜单内容二</t-menu-item>
    <t-menu-item name="item4" :disabled="true"><t-icon slot="icon" name="user" />菜单内容三</t-menu-item>
    <div slot="options">
      <t-icon :name="iconName" @click.native="changeCollapsed" />
    </div>
  </t-menu>
</template>

<script>
export default {
  data() {
    return {
      collapsed: true,
    };
  },
  computed: {
    iconName() {
      return this.collapsed ? 'chevron-right' : 'chevron-left';
    },
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

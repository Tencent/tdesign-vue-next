<template>
  <div>
    <t-head-menu theme="light" active="item2" @change="changeHandler">
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
    </t-head-menu>

    <br />

    <t-head-menu theme="dark" active="item1">
      <img slot="logo" width="136" class="t-menu__logo--center" src="https://www.tencent.com/img/index/menu_logo.png" alt="logo">
      <t-menu-item name="item1">已选内容</t-menu-item>
      <t-menu-item name="item2">菜单内容一</t-menu-item>
      <t-menu-item name="item3">菜单内容二</t-menu-item>
      <t-menu-item name="item4" :disabled="true">菜单内容三</t-menu-item>
      <div slot="options">
        <a href="javascript:;"><t-icon name="search"/></a>
        <a href="javascript:;"><t-icon name="notification-filled"/></a>
        <a href="javascript:;"><t-icon name="home"/></a>
      </div>
    </t-head-menu>
  </div>
</template>

<script>
export default {
  methods: {
    changeHandler(active) {
      console.log('change', active);
    },
  },
};
</script>

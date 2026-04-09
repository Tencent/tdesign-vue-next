<template>
  <div class="box" style="max-width: 800px">
    <t-head-menu default-value="2-1" theme="dark" expand-type="popup" style="margin-top: 24px">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
      </template>
      <t-menu-item value="1-1"> 子菜单1-1 </t-menu-item>
      <t-menu-item value="2-1"> 子菜单2-1 </t-menu-item>
      <t-menu-item value="3-1"> 子菜单3-1 </t-menu-item>
      <t-menu-item value="4-1"> 子菜单4-1 </t-menu-item>
      <t-menu-item value="5-1"> 子菜单5-1 </t-menu-item>
      <t-menu-item value="6-1"> 子菜单6-1 </t-menu-item>
      <t-menu-item value="7-1"> 子菜单7-1 </t-menu-item>
      <t-menu-item value="8-1"> 子菜单8-1 </t-menu-item>
      <t-menu-item value="9-1"> 子菜单9-1 </t-menu-item>
      <t-menu-item value="10-1"> 子菜单10-1 </t-menu-item>
      <t-submenu
        value="26"
        :popup-props="{
          overlayClassName: 'custom-popup-class',
        }"
      >
        <template #title>
          <span>菜单11-1</span>
        </template>
        <t-menu-item value="26-1"> 子菜单2-1 </t-menu-item>
        <t-menu-item value="26-2"> 子菜单2-2 </t-menu-item>
        <t-menu-item value="26-3"> 子菜单2-3 </t-menu-item>
      </t-submenu>
      <template #operations>
        <div class="t-demo-menu--dark">
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="search" /></template>
          </t-button>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="mail" /></template>
          </t-button>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="user" /></template>
          </t-button>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="ellipsis" /></template>
          </t-button>
        </div>
      </template>
    </t-head-menu>
  </div>
</template>
<style lang="less" scoped>
.t-menu__operations {
  .t-button {
    margin-left: 8px;
  }
}
.t-demo-menu--dark {
  .t-button {
    color: #fff;
    &:hover {
      background-color: #4b4b4b;
      border-color: transparent;
      --ripple-color: #383838;
    }
  }
}
</style>

<template>
  <div class="box" style="max-width: 500px">
    <t-head-menu default-value="2" theme="dark" expand-type="popup" style="margin-top: 24px">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
      </template>
      <t-menu-item value="1"> 菜单1 </t-menu-item>
      <t-menu-item value="2"> 菜单2 </t-menu-item>
      <t-menu-item value="3"> 菜单3 </t-menu-item>
      <t-menu-item value="4"> 菜单4 </t-menu-item>
      <t-menu-item value="5"> 菜单5 </t-menu-item>
      <t-menu-item value="6"> 菜单6 </t-menu-item>
      <t-menu-item value="7"> 菜单7 </t-menu-item>
      <t-menu-item value="8"> 菜单8 </t-menu-item>
      <t-menu-item value="9"> 菜单9 </t-menu-item>
      <t-menu-item value="10"> 菜单10 </t-menu-item>
      <t-submenu
        value="26"
        :popup-props="{
          overlayClassName: 'custom-popup-class',
        }"
      >
        <template #title>
          <span>菜单11</span>
        </template>
        <t-menu-item value="26"> 子菜单11-1 </t-menu-item>
        <t-menu-item value="26-2"> 子菜单11-2 </t-menu-item>
        <t-menu-item value="26-3"> 子菜单11-3 </t-menu-item>
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

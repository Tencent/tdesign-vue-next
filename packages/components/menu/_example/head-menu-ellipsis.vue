<template>
  <div class="box">
    <t-head-menu default-value="2-1" theme="dark" expand-type="popup" style="margin-top: 24px">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
      </template>
      <t-menu-item value="1-1"> 子菜单1-1 </t-menu-item>
      <t-menu-item value="2-1"> 子菜单2-1 </t-menu-item>
      <t-menu-item value="3-1"> 子菜单3-1 </t-menu-item>
      <t-menu-item value="4-1"> 子菜单4-1 </t-menu-item>
      <t-menu-item value="5-1"> 子菜单5-1这个菜单有点长 </t-menu-item>
      <t-menu-item value="6-1"> 子菜单6-1 </t-menu-item>
      <t-menu-item value="7-1"> 子菜单7-1 </t-menu-item>
      <t-menu-item value="8-1"> 子菜单8-1 </t-menu-item>
      <t-menu-item value="9-1"> 子菜单9-1 </t-menu-item>
      <t-menu-item value="10-1"> 子菜单10-1 </t-menu-item>
      <t-menu-item value="11-1"> 子菜单11-1 </t-menu-item>
      <t-menu-item value="12-1"> 子菜单12-1 </t-menu-item>
      <t-menu-item value="13-1"> 子菜单13-1 </t-menu-item>
      <t-menu-item value="14-1"> 子菜单14-1 </t-menu-item>
      <t-menu-item value="15-1"> 子菜单15-1 </t-menu-item>
      <t-menu-item value="16-1"> 子菜单16-1 </t-menu-item>
      <t-menu-item value="17-1"> 子菜单17-1 </t-menu-item>
      <t-menu-item value="18-1"> 子菜单18-1 </t-menu-item>
      <t-menu-item value="19-1"> 子菜单19-1 </t-menu-item>
      <t-menu-item value="20-1"> 子菜单20-1 </t-menu-item>
      <t-menu-item value="21-1"> 子菜单21-1 </t-menu-item>
      <t-submenu value="22">
        <template #title>
          <span>菜单1</span>
        </template>
        <t-submenu value="22-1" title="子菜单22-1">
          <t-menu-item value="22-1-1"> 子菜单22-1-1 </t-menu-item>
          <t-menu-item value="22-1-3"> 子菜单22-1-3 </t-menu-item>
          <t-menu-item value="22-1-2"> 子菜单22-1-2 </t-menu-item>
          <t-menu-item value="22-1-4"> 子菜单22-1-4 </t-menu-item>
          <t-menu-item value="22-1-5"> 子菜单22-1-5 </t-menu-item>
          <t-menu-item value="22-1-6"> 子菜单22-1-6 </t-menu-item>
          <t-menu-item value="22-1-7"> 子菜单22-1-7 </t-menu-item>
          <t-menu-item value="22-1-8"> 子菜单22-1-8 </t-menu-item>
          <t-menu-item value="22-1-9"> 子菜单22-1-9 </t-menu-item>
          <t-submenu value="22-1-10" title="子菜单22-1-10">
            <t-menu-item value="22-1-10-1"> 子菜单22-1-10-1 </t-menu-item>
            <t-menu-item value="22-1-10-3"> 子菜单22-1-10-3 </t-menu-item>
            <t-menu-item value="22-1-10-2"> 子菜单22-1-10-2 </t-menu-item>
            <t-menu-item value="22-1-10-4"> 子菜单22-1-10-4 </t-menu-item>
            <t-menu-item value="22-1-10-5"> 子菜单22-1-10-5 </t-menu-item>
            <t-menu-item value="22-1-10-6"> 子菜单22-1-10-6 </t-menu-item>
            <t-menu-item value="22-1-10-7"> 子菜单22-1-10-7 </t-menu-item>
            <t-menu-item value="22-1-10-8"> 子菜单22-1-10-8 </t-menu-item>
            <t-menu-item value="22-1-10-9"> 子菜单22-1-10-9 </t-menu-item>
          </t-submenu>
        </t-submenu>
        <t-menu-item value="23-1"> 子菜单23-1 </t-menu-item>
        <t-menu-item value="24-2"> 子菜单24-2 </t-menu-item>
        <t-menu-item value="25-3"> 子菜单25-3 </t-menu-item>
      </t-submenu>
      <t-submenu
        value="26"
        :popup-props="{
          overlayClassName: 'custom-popup-class',
        }"
      >
        <template #title>
          <span>菜单2</span>
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

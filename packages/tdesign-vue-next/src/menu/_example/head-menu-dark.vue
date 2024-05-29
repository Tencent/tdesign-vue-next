<template>
  <t-head-menu theme="dark" value="item1">
    <template #logo>
      <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
    </template>
    <t-menu-item value="item1"> 已选内容 </t-menu-item>
    <t-menu-item value="item2"> 菜单内容一 </t-menu-item>
    <t-menu-item value="item3"> 菜单内容二 </t-menu-item>
    <t-menu-item value="item4" :disabled="true"> 菜单内容三 </t-menu-item>
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
</template>

<style lang="less" scoped>
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

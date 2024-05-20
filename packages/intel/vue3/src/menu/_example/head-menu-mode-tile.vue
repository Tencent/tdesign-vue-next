<template>
  <t-head-menu theme="dark" value="item2">
    <template #logo>
      <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" />
    </template>
    <t-menu-item value="item1"> 菜单内容一 </t-menu-item>
    <t-menu-item value="item2"> 已选内容 </t-menu-item>
    <t-menu-item value="item3"> 菜单内容二 </t-menu-item>
    <t-menu-item value="item4" :disabled="true"> 菜单内容三 </t-menu-item>
    <template #operations>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis" /></a>
    </template>
    <template #submenu>
      <t-submenu>
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
      </t-submenu>
    </template>
  </t-head-menu>
</template>

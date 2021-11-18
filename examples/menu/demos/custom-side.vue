<template>
  <t-menu
    theme="light"
    default-value="item2"
  >
    <template #logo>
      <img
        width="136"
        src="https://www.tencent.com/img/index/menu_logo_hover.png"
        alt="logo"
      >
    </template>
    <t-menu-item value="item1">
      菜单内容一
    </t-menu-item>
    <t-menu-item value="item2">
      已选内容
    </t-menu-item>
    <t-menu-item value="item3">
      菜单内容二
    </t-menu-item>
    <t-menu-item
      value="item4"
      :disabled="true"
    >
      菜单内容三
    </t-menu-item>
  </t-menu>
</template>
<script />

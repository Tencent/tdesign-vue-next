<template>
  <t-head-menu theme="dark" defaultValue="item1">
    <template #logo>
      <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
    </template>
    <t-menu-item value="item1">已选内容</t-menu-item>
    <t-menu-item value="item2">菜单内容一</t-menu-item>
    <t-menu-item value="item3">菜单内容二</t-menu-item>
    <t-menu-item value="item4" :disabled="true">菜单内容三</t-menu-item>
    <template #operations>
      <div class="t-demo-menu--dark">
        <t-button variant="text" shape="square">
          <search-icon slot="icon" />
        </t-button>
        <t-button variant="text" shape="square">
          <mail-icon slot="icon" />
        </t-button>
        <t-button variant="text" shape="square">
          <user-icon slot="icon" />
        </t-button>
        <t-button variant="text" shape="square">
          <ellipsis-icon slot="icon" />
        </t-button>
      </div>
    </template>
  </t-head-menu>
</template>

<script setup>
import {
  SearchIcon, MailIcon, UserIcon, EllipsisIcon,
} from 'tdesign-icons-vue';
</script>

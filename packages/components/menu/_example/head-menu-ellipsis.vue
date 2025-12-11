<template>
  <div>
    <p>缩小浏览器窗口宽度，可以看到多余的菜单项会被收纳到省略号图标的弹出菜单中。</p>
    <p>Resize the browser window width to see the overflow menu items being collapsed into an ellipsis popup menu.</p>
    <br />
    <t-head-menu v-model="activeValue" theme="light" :ellipsis="true">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" />
      </template>
      <t-menu-item value="item1"> 菜单一 </t-menu-item>
      <t-menu-item value="item2"> 菜单二 </t-menu-item>
      <t-menu-item value="item3"> 菜单三 </t-menu-item>
      <t-menu-item value="item4"> 菜单四 </t-menu-item>
      <t-menu-item value="item5"> 菜单五 </t-menu-item>
      <t-menu-item value="item6"> 菜单六 </t-menu-item>
      <t-menu-item value="item7"> 菜单七 </t-menu-item>
      <t-menu-item value="item8"> 菜单八 </t-menu-item>
      <template #operations>
        <t-button variant="text" shape="square">
          <template #icon><t-icon name="search" /></template>
        </t-button>
        <t-button variant="text" shape="square">
          <template #icon><t-icon name="user" /></template>
        </t-button>
      </template>
    </t-head-menu>

    <br />
    <br />

    <p>使用 ellipsis=false 禁用省略功能</p>
    <p>Use ellipsis=false to disable the ellipsis feature</p>
    <br />
    <t-head-menu v-model="activeValue2" theme="dark" :ellipsis="false">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
      </template>
      <t-menu-item value="item1"> 菜单一 </t-menu-item>
      <t-menu-item value="item2"> 菜单二 </t-menu-item>
      <t-menu-item value="item3"> 菜单三 </t-menu-item>
      <t-menu-item value="item4"> 菜单四 </t-menu-item>
      <t-menu-item value="item5"> 菜单五 </t-menu-item>
      <t-menu-item value="item6"> 菜单六 </t-menu-item>
      <template #operations>
        <div class="t-demo-menu--dark">
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="search" /></template>
          </t-button>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="user" /></template>
          </t-button>
        </div>
      </template>
    </t-head-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeValue = ref('item1');
const activeValue2 = ref('item1');
</script>

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

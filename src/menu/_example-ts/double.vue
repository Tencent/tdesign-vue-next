<template>
  <div class="box" :style="{ width: '800px' }">
    <t-head-menu default-value="1-1" :default-expanded="expanded">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" />
      </template>
      <t-submenu value="1">
        <template #title>
          <span>菜单1</span>
        </template>
        <t-menu-item value="1-1">子菜单1-1</t-menu-item>
        <t-menu-item value="1-2">子菜单1-2</t-menu-item>
        <t-menu-item value="1-3">子菜单1-3</t-menu-item>
      </t-submenu>
      <t-submenu value="2">
        <template #title>
          <span>菜单2</span>
        </template>
        <t-menu-item value="2-1">子菜单2-1</t-menu-item>
        <t-menu-item value="2-2">子菜单2-2</t-menu-item>
        <t-menu-item value="2-3">子菜单2-3</t-menu-item>
      </t-submenu>
      <t-submenu value="3">
        <template #title>
          <span>菜单3</span>
        </template>
        <t-menu-item value="3-1">子菜单3-1</t-menu-item>
        <t-menu-item value="3-2">子菜单3-2</t-menu-item>
        <t-menu-item value="3-3">子菜单3-3</t-menu-item>
      </t-submenu>
      <t-submenu value="4">
        <template #title>
          <span>菜单4</span>
        </template>
        <t-menu-item value="4-1">子菜单4-1</t-menu-item>
        <t-menu-item value="4-2">子菜单4-2</t-menu-item>
        <t-menu-item value="4-3">子菜单4-3</t-menu-item>
      </t-submenu>
      <t-submenu value="5">
        <template #title>
          <span>菜单5</span>
        </template>
        <t-menu-item value="5-1">子菜单5-1</t-menu-item>
        <t-menu-item value="5-2">子菜单5-2</t-menu-item>
        <t-menu-item value="5-3">子菜单5-3</t-menu-item>
      </t-submenu>
      <t-submenu value="6">
        <template #title>
          <span>菜单6</span>
        </template>
        <t-menu-item value="6-1">子菜单6-1</t-menu-item>
        <t-menu-item value="6-2">子菜单6-2</t-menu-item>
        <t-menu-item value="6-3">子菜单6-3</t-menu-item>
      </t-submenu>
      <template #operations>
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
      </template>
    </t-head-menu>
    <t-head-menu :default-expanded="expanded2" default-value="1-1" theme="dark" style="margin-top: 24px">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
      </template>
      <t-submenu value="1">
        <template #title>
          <span>菜单1</span>
        </template>
        <t-menu-item value="1-1">子菜单1-1</t-menu-item>
        <t-menu-item value="1-2">子菜单1-2</t-menu-item>
        <t-menu-item value="1-3">子菜单1-3</t-menu-item>
      </t-submenu>
      <t-submenu value="2">
        <template #title>
          <span>菜单2</span>
        </template>
        <t-menu-item value="2-1">子菜单2-1</t-menu-item>
        <t-menu-item value="2-2">子菜单2-2</t-menu-item>
        <t-menu-item value="2-3">子菜单2-3</t-menu-item>
      </t-submenu>
      <t-submenu value="3">
        <template #title>
          <span>菜单3</span>
        </template>
        <t-menu-item value="3-1">子菜单3-1</t-menu-item>
        <t-menu-item value="3-2">子菜单3-2</t-menu-item>
        <t-menu-item value="3-3">子菜单3-3</t-menu-item>
      </t-submenu>
      <t-submenu value="4">
        <template #title>
          <span>菜单4</span>
        </template>
        <t-menu-item value="4-1">子菜单4-1</t-menu-item>
        <t-menu-item value="4-2">子菜单4-2</t-menu-item>
        <t-menu-item value="4-3">子菜单4-3</t-menu-item>
      </t-submenu>
      <t-submenu value="5">
        <template #title>
          <span>菜单5</span>
        </template>
        <t-menu-item value="5-1">子菜单5-1</t-menu-item>
        <t-menu-item value="5-2">子菜单5-2</t-menu-item>
        <t-menu-item value="5-3">子菜单5-3</t-menu-item>
      </t-submenu>
      <t-submenu value="6">
        <template #title>
          <span>菜单6</span>
        </template>
        <t-menu-item value="6-1">子菜单6-1</t-menu-item>
        <t-menu-item value="6-2">子菜单6-2</t-menu-item>
        <t-menu-item value="6-3">子菜单6-3</t-menu-item>
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

<script lang="ts" setup>
import { ref } from 'vue';
import { HeadMenuProps } from 'tdesign-vue-next';
const expanded = ref<HeadMenuProps['defaultExpanded']>(['1']);
const expanded2 = ref<HeadMenuProps['defaultExpanded']>(['1']);
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

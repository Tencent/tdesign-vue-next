<template>
  <div class="box" :style="{ width: '800px' }">
    <t-head-menu default-value="1-1" :default-expanded="expanded">
      <template #logo>
        <img width="136" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
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
      <t-submenu value="7">
        <template #title>
          <span>菜单7</span>
        </template>
        <t-menu-item value="7-1">子菜单7-1</t-menu-item>
        <t-menu-item value="7-2">子菜单7-2</t-menu-item>
        <t-menu-item value="7-3">子菜单7-3</t-menu-item>
      </t-submenu>
      <template #operations>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail" /></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis" /></a>
      </template>
    </t-head-menu>
    <t-head-menu :default-expanded="expanded2" default-value="1-1" theme="dark" style="margin-top: 24px">
      <template #logo>
        <img width="136" src="https://www.tencent.com/img/index/menu_logo.png" alt="logo" />
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
      <t-submenu value="7">
        <template #title>
          <span>菜单7</span>
        </template>
        <t-menu-item value="7-1">子菜单7-1</t-menu-item>
        <t-menu-item value="7-2">子菜单7-2</t-menu-item>
        <t-menu-item value="7-3">子菜单7-3</t-menu-item>
      </t-submenu>
      <template #operations>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail" /></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis" /></a>
      </template>
    </t-head-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const expanded = ref(['1']);
const expanded2 = ref(['1']);
</script>

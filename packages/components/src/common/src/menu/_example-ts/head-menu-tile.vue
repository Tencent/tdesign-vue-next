<template>
  <t-head-menu theme="dark" :value="active" @change="changeHandler">
    <template #logo>
      <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
    </template>
    <t-menu-item v-for="(menu, index) in menus" :key="index" :value="`${index + 1}`">
      {{ menu.title }}
      <t-submenu>
        <t-menu-item
          v-for="(cMenu, cIndex) in menu.children"
          :key="`${index}-${cIndex}`"
          :value="`${index + 1}-${cIndex + 1}`"
        >
          {{ cMenu.title }}
        </t-menu-item>
      </t-submenu>
    </t-menu-item>
    <t-menu-item value="4" :disabled="true"> 菜单4 </t-menu-item>
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { HeadMenuProps } from 'tdesign-vue-next';
const menus = [
  {
    title: '菜单1',
    children: [
      {
        title: '子菜单1-1',
      },
      {
        title: '子菜单1-2',
      },
      {
        title: '子菜单1-3',
      },
    ],
  },
  {
    title: '菜单2',
    children: [
      {
        title: '子菜单2-1',
      },
      {
        title: '子菜单2-2',
      },
      {
        title: '子菜单2-3',
      },
    ],
  },
  {
    title: '菜单3',
    children: [
      {
        title: '子菜单3-1',
      },
      {
        title: '子菜单3-2',
      },
      {
        title: '子菜单3-3',
      },
    ],
  },
];
const active = ref<HeadMenuProps['value']>('2-1');
const changeHandler: HeadMenuProps['onChange'] = (val) => {
  active.value = val;
};
</script>

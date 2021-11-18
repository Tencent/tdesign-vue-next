<template>
  <t-head-menu
    theme="dark"
    :value="active"
    @change="changeHandler"
  >
    <template #logo>
      <img
        width="136"
        class="t-menu__logo--center"
        src="https://www.tencent.com/img/index/menu_logo.png"
        alt="logo"
      >
    </template>
    <t-menu-item
      v-for="(menu,index) in menus"
      :key="index"
      :value="`${index+1}`"
    >
      {{ menu.title }}
      <t-submenu>
        <t-menu-item
          v-for="(cMenu,cIndex) in menu.children"
          :key="`${index}-${cIndex}`"
          :value="`${index+1}-${cIndex+1}`"
        >
          {{ cMenu.title }}
        </t-menu-item>
      </t-submenu>
    </t-menu-item>
    <t-menu-item
      value="4"
      :disabled="true"
    >
      菜单4
    </t-menu-item>
    <template #operations>
      <a href="javascript:;"><t-icon
        class="t-menu__operations-icon"
        name="search"
      /></a>
      <a href="javascript:;"><t-icon
        class="t-menu__operations-icon"
        name="mail"
      /></a>
      <a href="javascript:;"><t-icon
        class="t-menu__operations-icon"
        name="user"
      /></a>
      <a href="javascript:;"><t-icon
        class="t-menu__operations-icon"
        name="ellipsis"
      /></a>
    </template>
  </t-head-menu>
</template>

<script>
import { defineComponent, ref } from 'vue';

const menus = [{
  title: '菜单1',
  children: [{
    title: '子菜单1-1',
  }, {
    title: '子菜单1-2',
  }, {
    title: '子菜单1-3',
  }],
}, {
  title: '菜单2',
  children: [{
    title: '子菜单2-1',
  }, {
    title: '子菜单2-2',
  }, {
    title: '子菜单2-3',
  }],
}, {
  title: '菜单3',
  children: [{
    title: '子菜单3-1',
  }, {
    title: '子菜单3-2',
  }, {
    title: '子菜单3-3',
  }],
}];

export default defineComponent({
  setup() {
    const active = ref('2-1');

    const changeHandler = (val) => {
      active.value = val;
    };
    return {
      active,
      menus,
      changeHandler,
    };
  },
});
</script>

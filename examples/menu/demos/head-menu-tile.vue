<template>
  <t-head-menu @change="changeHandler" theme="dark" :active="active" mode="tile">
    <img slot="logo" class="t-menu__logo--center" src="https://main.qcloudimg.com/raw/4927884bb0c43e726c5915d5bef49ef3/head-logo-dark.png" alt="logo">
    <t-menu-item :name="`${index+1}`" v-for="(menu,index) in menus" :key="index">
      {{menu.title}}
      <t-submenu>
        <t-menu-item v-for="(cMenu,cIndex) in menu.children" :key="`${index}-${cIndex}`" :name="`${index+1}-${cIndex+1}`">{{cMenu.title}}</t-menu-item>
      </t-submenu>
    </t-menu-item>
    <t-menu-item name="4" :disabled="true">菜单4</t-menu-item>
    <div slot="options">
      <a href="javascript:;"><t-icon name="search"/></a>
      <a href="javascript:;"><t-icon name="notification_full"/></a>
      <a href="javascript:;"><t-icon name="home"/></a>
    </div>
  </t-head-menu>
</template>

<script>
export default {
  data() {
    return {
      active: '2-1',
      menus: [{
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
      }],
    };
  },
  methods: {
    changeHandler(active) {
      this.active = active;
    },
  },
};
</script>

<template>
  <t-menu
    theme="light"
    active="2-1"
    :collapsed="collapsed"
    height="550px"
  >
    <template #logo>
      <span>LOGO</span>
    </template>
    <t-menu-item name="item1">
      <template #icon>
        <t-icon name="user" />
      </template>
      菜单内容一
    </t-menu-item>
    <t-submenu
      name="2"
      mode="popup"
    >
      <template #icon>
        <t-icon name="user" />
      </template>
      <template #title>
        <span >侧边内容二</span>
      </template>
      <t-menu-item name="2-1">
        菜单内容一
      </t-menu-item>
      <t-menu-item name="2-2">
        菜单内容二
      </t-menu-item>
      <t-menu-item name="2-3">
        菜单内容三
      </t-menu-item>
    </t-submenu>
    <t-menu-item name="item3">
      <template #icon>
        <t-icon name="user" />
      </template>
      菜单内容二
    </t-menu-item>
    <t-menu-item
      name="item4"
      :disabled="true"
    >
      <template #icon>
        <t-icon name="user" />
      </template>
      菜单内容三
    </t-menu-item>
    <template #options>
      <t-icon
        :name="iconName"
        @click="changeCollapsed"
      />
    </template>
  </t-menu>
</template>

<script>
export default {
  data() {
    return {
      collapsed: true,
    };
  },
  computed: {
    iconName() {
      return this.collapsed ? 'chevron-right' : 'chevron-left';
    },
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<template>
  <t-menu theme="light" defaultValue="item2" :collapsed="collapsed" @change="changeHandler" height="550px">
    <template #logo>
      <img :width="collapsed ? 35 : 136"  :src="iconUrl" alt="logo">
    </template>
    <t-menu-group title="Classification A">
      <t-menu-item value="item1">
        <template #icon>
          <t-icon name="dashboard"/>
        </template>
        仪表盘
      </t-menu-item>
    </t-menu-group>
    <t-menu-group title="Classification B">
      <t-menu-item value="item2">调度平台</t-menu-item>
      <t-menu-item value="item3">菜单内容二很长很长很长很长很长很长很长很长</t-menu-item>
    </t-menu-group>
    <t-menu-group title="Classification C">
      <t-menu-item value="item4" :disabled="true">精准监控</t-menu-item>
    </t-menu-group>
    <template #operations>
      <t-icon name="view-list" @click="changeCollapsed" />
    </template>
  </t-menu>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      iconUrl: 'https://www.tencent.com/img/index/menu_logo_hover.png',
    };
  },
  methods: {
    changeHandler(active) {
      console.log('change', active);
    },
    changeCollapsed() {
      this.collapsed = !this.collapsed;
      this.iconUrl = this.collapsed ? 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png' : 'https://www.tencent.com/img/index/menu_logo_hover.png';
    },
  },
};
</script>

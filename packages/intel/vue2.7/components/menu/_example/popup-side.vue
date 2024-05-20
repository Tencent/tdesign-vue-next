<template>
  <t-menu
    theme="light"
    defaultValue="2-1"
    :expanded="expanded"
    :collapsed="collapsed"
    expandMutex
    @expand="handleExpand"
  >
    <template #logo>
      <img :width="collapsed ? 35 : 136" :src="iconUrl" alt="logo" />
    </template>
    <t-menu-item value="item1">
      <template #icon>
        <icon name="dashboard" />
      </template>
      仪表盘
    </t-menu-item>
    <t-submenu value="2">
      <template #icon>
        <icon name="user-circle" />
      </template>
      <template #title>
        <span>个人中心</span>
      </template>
      <t-menu-item value="2-1">子菜单内容一</t-menu-item>
      <t-menu-item value="2-2">子菜单内容二</t-menu-item>
      <t-menu-item value="2-3">子菜单内容三</t-menu-item>
    </t-submenu>
    <t-submenu value="3">
      <template #icon>
        <icon name="root-list" />
      </template>
      <template #title>
        <span>根目录</span>
      </template>
      <t-menu-item value="3-1">子菜单内容一</t-menu-item>
      <t-menu-item value="3-2">子菜单内容二</t-menu-item>
      <t-menu-item value="3-3">子菜单内容三</t-menu-item>
    </t-submenu>
    <t-menu-item value="item4" :disabled="disabled">
      <template #icon>
        <icon name="server" />
      </template>
      资源列表
    </t-menu-item>
    <template #operations>
      <t-button class="t-demo-collapse-btn" variant="text" shape="square" @click.native="changeCollapsed">
        <icon name="view-list" />
      </t-button>
    </template>
  </t-menu>
</template>

<script>
import { Icon } from 'tdesign-icons-vue';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      expanded: ['2'],
      disabled: true,
      collapsed: false,
      iconUrl: 'https://tdesign.gtimg.com/site/baseLogo-light.png',
    };
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
      this.iconUrl = this.collapsed
        ? 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png'
        : 'https://tdesign.gtimg.com/site/baseLogo-light.png';
    },
    handleExpand(names) {
      console.log('receive handleExpand', names);
    },
  },
};
</script>

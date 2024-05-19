<template>
  <t-menu
    theme="light"
    default-value="2-1"
    :expanded="expanded"
    :collapsed="collapsed"
    expand-mutex
    @expand="handleExpand"
    @change="changeHandler"
  >
    <template #logo>
      <img :width="collapsed ? 35 : 136" :src="iconUrl" alt="logo" />
    </template>
    <t-menu-item value="item1">
      <template #icon>
        <t-icon name="dashboard" />
      </template>
      仪表盘
    </t-menu-item>
    <t-submenu value="2">
      <template #icon>
        <t-icon name="user-circle" />
      </template>
      <template #title>
        <span>个人中心</span>
      </template>
      <t-menu-item value="2-1"> 子菜单内容一 </t-menu-item>
      <t-menu-item value="2-2"> 子菜单内容二 </t-menu-item>
      <t-menu-item value="2-3"> 子菜单内容三 </t-menu-item>
    </t-submenu>
    <t-submenu value="3">
      <template #icon>
        <t-icon name="root-list" />
      </template>
      <template #title>
        <span>根目录</span>
      </template>
      <t-menu-item value="3-1"> 子菜单内容一 </t-menu-item>
      <t-menu-item value="3-2"> 子菜单内容二 </t-menu-item>
      <t-menu-item value="3-3"> 子菜单内容三 </t-menu-item>
    </t-submenu>
    <t-menu-item value="item4" :disabled="disabled">
      <template #icon>
        <t-icon name="server" />
      </template>
      资源列表
    </t-menu-item>
    <template #operations>
      <t-button variant="text" shape="square" @click="changeCollapsed">
        <template #icon><t-icon name="view-list" /></template>
      </t-button>
    </template>
  </t-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MenuProps, ButtonProps, MenuItemProps } from 'tdesign-vue-next';
const collapsed = ref(false);
const iconUrl = ref('https://tdesign.gtimg.com/site/baseLogo-light.png');
const changeCollapsed: ButtonProps['onClick'] = () => {
  collapsed.value = !collapsed.value;
  iconUrl.value = collapsed.value
    ? 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png'
    : 'https://tdesign.gtimg.com/site/baseLogo-light.png';
};
const handleExpand: MenuProps['onExpand'] = (names) => {
  console.log('receive handleExpand', names);
};
const changeHandler: MenuProps['onChange'] = (active) => {
  console.warn(active);
};
const expanded: MenuProps['expanded'] = ['2'];
const disabled: MenuItemProps['disabled'] = true;
</script>

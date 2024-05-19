<template>
  <t-menu theme="light" defaultValue="item2" :collapsed="collapsed" @change="changeHandler" height="550px">
    <template #logo>
      <img :width="collapsed ? 35 : 136" :src="iconUrl" alt="logo" />
    </template>
    <t-menu-group title="主导航">
      <t-menu-item value="item1">
        <template #icon>
          <icon name="app" />
        </template>
        仪表盘
      </t-menu-item>
    </t-menu-group>
    <t-menu-group title="组件">
      <t-submenu title="列表项" value="2-1">
        <template #icon>
          <icon name="server" />
        </template>
        <t-menu-item value="2-1-1">基础列表项</t-menu-item>
        <t-menu-item value="2-1-2">卡片列表项</t-menu-item>
        <t-menu-item value="2-1-3">筛选列表项</t-menu-item>
        <t-menu-item value="2-1-4">树状筛选列表项</t-menu-item>
      </t-submenu>
      <t-menu-item value="2-2">
        <template #icon>
          <icon name="edit-1" />
        </template>
        表单项
      </t-menu-item>
      <t-menu-item value="2-3">
        <template #icon>
          <icon name="root-list" />
        </template>
        详情页
      </t-menu-item>
      <t-menu-item value="2-4">
        <template #icon>
          <icon name="check" />
        </template>
        结果页
      </t-menu-item>
    </t-menu-group>
    <t-menu-group title="更多">
      <t-menu-item value="item3">
        <template #icon>
          <icon name="user" />
        </template>
        个人页
      </t-menu-item>
      <t-menu-item value="item4">
        <template #icon>
          <icon name="login" />
        </template>
        登录页
      </t-menu-item>
    </t-menu-group>
    <template #operations>
      <t-button class="t-demo-collapse-btn" variant="text" shape="square" @click.native="changeCollapsed">
        <icon name="view-list" />
      </t-button>
    </template>
  </t-menu>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from 'tdesign-icons-vue';

const collapsed = ref(false);
const iconUrl = ref('https://tdesign.gtimg.com/site/baseLogo-light.png');
const changeHandler = (active) => {
  console.log('change', active);
};
const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
  iconUrl.value = collapsed.value
    ? 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png'
    : 'https://tdesign.gtimg.com/site/baseLogo-light.png';
};
</script>

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
        <t-icon name="resources-list" />
      </template>
      资源列表
    </t-menu-item>
    <template #operations>
      <t-icon class="t-menu__operations-icon" name="view-list" @click="changeCollapsed" />
    </template>
  </t-menu>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const collapsed = ref(false);
    const iconUrl = ref('https://www.tencent.com/img/index/menu_logo_hover.png');

    const changeCollapsed = () => {
      collapsed.value = !collapsed.value;
      iconUrl.value = collapsed.value
        ? 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png'
        : 'https://www.tencent.com/img/index/menu_logo_hover.png';
    };

    const handleExpand = (names) => {
      console.log('receive handleExpand', names);
    };

    const changeHandler = (active) => {
      console.warn(active);
    };

    return {
      collapsed,
      iconUrl,
      changeCollapsed,
      expanded: ['2'],
      disabled: true,
      handleExpand,
      changeHandler,
    };
  },
});
</script>

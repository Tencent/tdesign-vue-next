<template>
  <div class="box">
    <t-menu v-model:expanded="expanded" theme="light" default-value="3-2" expand-mutex :collapsed="collapsed">
      <t-submenu value="3">
        <template #icon>
          <t-icon name="mail" />
        </template>
        <template #title>
          <span>消息区</span>
        </template>
        <t-submenu value="3-1" title="二级菜单">
          <t-menu-item value="3-1-1"> 三级菜单内容 </t-menu-item>
          <t-menu-item value="3-1-2"> 三级菜单内容 </t-menu-item>
          <t-menu-item value="3-1-3"> 三级菜单内容 </t-menu-item>
        </t-submenu>
        <t-submenu value="3-5" title="二级菜单">
          <t-menu-item value="3-5-1"> 三级菜单内容 </t-menu-item>
          <t-menu-item value="3-5-2"> 三级菜单内容 </t-menu-item>
          <t-menu-item value="3-5-3"> 三级菜单内容 </t-menu-item>
        </t-submenu>
        <t-menu-item value="3-2"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="3-3"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="3-4"> 二级菜单内容 </t-menu-item>
      </t-submenu>
      <t-menu-item value="user-circle">
        <template #icon>
          <t-icon name="user-circle" />
        </template>
        个人中心
      </t-menu-item>
      <t-submenu value="4">
        <template #icon>
          <t-icon name="play-circle" />
        </template>
        <template #title>
          <span>视频区</span>
        </template>
        <t-menu-item value="4-1"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="4-2"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="4-3"> 二级菜单内容 </t-menu-item>
      </t-submenu>
      <t-menu-item value="edit1">
        <template #icon>
          <t-icon name="edit-1" />
        </template>
        资源编辑
      </t-menu-item>
      <template #operations>
        <t-button variant="text" shape="square" @click="changeCollapsed">
          <template #icon><t-icon name="view-list" /></template>
        </t-button>
      </template>
    </t-menu>

    <t-menu
      v-model:expanded="expanded2"
      theme="dark"
      default-value="2-1"
      style="margin-left: 50px"
      height="550px"
      :collapsed="collapsed2"
    >
      <t-menu-item value="item1">
        <template #icon>
          <t-icon name="dashboard" />
        </template>
        仪表盘
      </t-menu-item>
      <t-menu-item value="resource">
        <template #icon>
          <t-icon name="server" />
        </template>
        资源列表
      </t-menu-item>
      <t-menu-item value="root">
        <template #icon>
          <t-icon name="root-list" />
        </template>
        根目录
      </t-menu-item>
      <t-submenu value="2">
        <template #icon>
          <t-icon name="control-platform" />
        </template>
        <template #title>
          <span>调度平台</span>
        </template>
        <t-menu-item value="2-1"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="2-2"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="2-3"> 二级菜单内容 </t-menu-item>
      </t-submenu>
      <t-menu-item value="precise-monitor">
        <template #icon>
          <t-icon name="precise-monitor" />
        </template>
        精准监控
      </t-menu-item>
      <t-submenu title="消息区" value="3" disabled>
        <template #icon>
          <t-icon name="mail" />
        </template>
        <template #title>
          <span>消息区</span>
        </template>
        <t-menu-item value="3-1"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="3-2"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="3-3"> 二级菜单内容 </t-menu-item>
      </t-submenu>
      <t-menu-item value="user-circle">
        <template #icon>
          <t-icon name="user-circle" />
        </template>
        个人中心
      </t-menu-item>
      <t-submenu value="4">
        <template #icon>
          <t-icon name="play-circle" />
        </template>
        <template #title>
          <span>视频区</span>
        </template>
        <t-menu-item value="4-1"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="4-2"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="4-3"> 二级菜单内容 </t-menu-item>
      </t-submenu>
      <t-menu-item value="edit1">
        <template #icon>
          <t-icon name="edit-1" />
        </template>
        资源编辑
      </t-menu-item>
      <template #operations>
        <t-button class="t-demo-collapse-btn" variant="text" shape="square" @click="changeCollapsed2">
          <template #icon><t-icon name="view-list" /></template>
        </t-button>
      </template>
    </t-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MenuProps, ButtonProps } from 'tdesign-vue-next';
const collapsed = ref(false);
const collapsed2 = ref(false);
const changeCollapsed: ButtonProps['onClick'] = () => {
  collapsed.value = !collapsed.value;
};
const changeCollapsed2: ButtonProps['onClick'] = () => {
  collapsed2.value = !collapsed2.value;
};
const expanded = ref<MenuProps['expanded']>(['2', '3']);
const expanded2 = ref<MenuProps['expanded']>(['2']);
</script>

<style lang="less" scoped>
.t-demo-collapse-btn {
  color: #fff;
  &:hover {
    background-color: #4b4b4b;
    border-color: transparent;
    --ripple-color: #383838;
  }
}
</style>

<template>
  <div class="box">
    <t-menu
      theme="light"
      defaultValue="3-2"
      expandMutex
      :defaultExpanded="expanded"
      height="550px"
      :collapsed="collapsed"
    >
      <t-submenu title="消息区" value="3">
        <template #icon>
          <icon name="mail" />
        </template>
        <t-submenu title="二级菜单" value="3-1">
          <t-menu-item value="3-1-1">三级菜单内容</t-menu-item>
          <t-menu-item value="3-1-2">三级菜单内容</t-menu-item>
          <t-menu-item value="3-1-3">三级菜单内容</t-menu-item>
        </t-submenu>
        <t-submenu title="二级菜单" value="3-5">
          <t-menu-item value="3-5-1">三级菜单内容</t-menu-item>
          <t-menu-item value="3-5-2">三级菜单内容</t-menu-item>
          <t-menu-item value="3-5-3">三级菜单内容</t-menu-item>
        </t-submenu>
        <t-menu-item value="3-2">二级菜单内容</t-menu-item>
        <t-menu-item value="3-3">二级菜单内容</t-menu-item>
        <t-menu-item value="3-4">二级菜单内容</t-menu-item>
      </t-submenu>
      <t-menu-item value="user-circle">
        <template #icon>
          <icon name="user-circle" />
        </template>
        个人中心
      </t-menu-item>
      <t-submenu disabled title="视频区" value="4">
        <template #icon>
          <icon name="play-circle" />
        </template>
        <t-menu-item value="4-1">二级菜单内容</t-menu-item>
        <t-menu-item value="4-2">二级菜单内容</t-menu-item>
        <t-menu-item value="4-3">二级菜单内容</t-menu-item>
      </t-submenu>
      <t-menu-item value="edit1">
        <template #icon>
          <icon name="edit-1" />
        </template>
        资源编辑
      </t-menu-item>
      <template #operations>
        <t-button variant="text" shape="square">
          <t-button variant="text" shape="square" @click.native="changeCollapsed">
            <view-list-icon slot="icon" />
          </t-button>
        </t-button>
      </template>
    </t-menu>

    <t-menu
      theme="dark"
      defaultValue="2-1"
      style="margin-left: 40px"
      :expanded="expanded2"
      @expand="expanded2 = $event"
      height="550px"
      :collapsed="collapsed2"
    >
      <t-menu-item value="item1">
        <template #icon>
          <icon name="dashboard" />
        </template>
        仪表盘
      </t-menu-item>
      <t-menu-item value="resource">
        <template #icon>
          <icon name="server" />
        </template>
        资源列表
      </t-menu-item>
      <t-menu-item value="root">
        <template #icon>
          <icon name="root-list" />
        </template>
        根目录
      </t-menu-item>
      <t-submenu title="调度平台" value="2">
        <template #icon>
          <icon name="control-platform" />
        </template>
        <t-menu-item value="2-1">二级菜单内容</t-menu-item>
        <t-menu-item value="2-2">二级菜单内容</t-menu-item>
        <t-menu-item value="2-3">二级菜单内容</t-menu-item>
      </t-submenu>
      <t-menu-item value="precise-monitor">
        <template #icon>
          <icon name="precise-monitor" />
        </template>
        精准监控
      </t-menu-item>
      <t-submenu disabled title="消息区" value="3">
        <template #icon>
          <icon name="mail" />
        </template>
        <t-menu-item value="3-1">二级菜单内容</t-menu-item>
        <t-menu-item value="3-2">二级菜单内容</t-menu-item>
        <t-menu-item value="3-3">二级菜单内容</t-menu-item>
      </t-submenu>
      <t-menu-item value="user-circle">
        <template #icon>
          <icon name="user-circle" />
        </template>
        个人中心
      </t-menu-item>
      <t-submenu title="视频区" value="4">
        <template #icon>
          <icon name="play-circle" />
        </template>
        <t-menu-item value="4-1">二级菜单内容</t-menu-item>
        <t-menu-item value="4-2">二级菜单内容</t-menu-item>
        <t-menu-item value="4-3">二级菜单内容</t-menu-item>
      </t-submenu>
      <t-menu-item value="edit1">
        <template #icon>
          <icon name="edit-1" />
        </template>
        资源编辑
      </t-menu-item>
      <template #operations>
        <t-button class="t-demo-collapse-btn" variant="text" shape="square" @click.native="changeCollapsed2">
          <view-list-icon slot="icon" />
        </t-button>
      </template>
    </t-menu>
  </div>
</template>

<script>
import { Icon, ViewListIcon } from 'tdesign-icons-vue';

export default {
  components: {
    Icon,
    ViewListIcon,
  },
  data() {
    return {
      expanded: ['2', '3'],
      expanded2: ['2'],
      collapsed: false,
      collapsed2: false,
    };
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
    changeCollapsed2() {
      this.collapsed2 = !this.collapsed2;
    },
  },
};
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

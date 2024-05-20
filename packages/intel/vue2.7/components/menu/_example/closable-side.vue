<template>
  <t-menu theme="light" defaultValue="2-1" :collapsed="collapsed" height="550px">
    <template #logo>
      <span>LOGO</span>
    </template>
    <t-menu-item value="item1">
      <template #icon>
        <icon name="dashboard" />
      </template>
      仪表盘
    </t-menu-item>
    <t-submenu value="2">
      <template #icon>
        <icon name="mail" />
      </template>
      <span slot="title">信息区</span>
      <t-menu-item value="2-1">菜单内容一</t-menu-item>
      <t-menu-item value="2-2">菜单内容二</t-menu-item>
      <t-menu-item value="2-3">菜单内容三</t-menu-item>
    </t-submenu>
    <t-menu-item value="item3">
      <template #icon>
        <icon name="play-circle" />
      </template>
      视频区
    </t-menu-item>
    <t-menu-item value="item4" :disabled="true">
      <template #icon>
        <icon name="edit-1" />
      </template>
      资源区
    </t-menu-item>
    <template #operations>
      <t-button class="t-demo-collapse-btn" variant="text" shape="square" @click.native="changeCollapsed">
        <icon :name="iconName" slot="icon" />
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

<template>
  <div class="box">
    <t-head-menu defaultValue="1-1" :defaultExpanded="expanded">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" />
      </template>
      <t-submenu value="1">
        <template #title>
          <span>菜单1</span>
        </template>
        <t-menu-item value="1-1">子菜单1-1</t-menu-item>
        <t-menu-item value="1-2">子菜单1-2</t-menu-item>
        <t-menu-item value="1-3">子菜单1-3</t-menu-item>
      </t-submenu>
      <t-submenu value="2">
        <template #title>
          <span>菜单2</span>
        </template>
        <t-menu-item value="2-1">子菜单2-1</t-menu-item>
        <t-menu-item value="2-2">子菜单2-2</t-menu-item>
        <t-menu-item value="2-3">子菜单2-3</t-menu-item>
      </t-submenu>
      <template #operations>
        <t-button variant="text" shape="square">
          <search-icon slot="icon" shape="square" />
        </t-button>
        <t-button variant="text" shape="square">
          <mail-icon slot="icon" />
        </t-button>
        <t-button variant="text" shape="square">
          <user-icon slot="icon" />
        </t-button>
        <t-button variant="text" shape="square">
          <ellipsis-icon slot="icon" />
        </t-button>
      </template>
    </t-head-menu>
    <t-head-menu
      defaultValue="1-1"
      theme="dark"
      :expanded="expanded2"
      @expand="expanded2 = $event"
      style="margin-top: 24px"
    >
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
      </template>
      <t-submenu value="1">
        <template #title>
          <span>菜单1</span>
        </template>
        <t-menu-item value="1-1">子菜单1-1</t-menu-item>
        <t-menu-item value="1-2">子菜单1-2</t-menu-item>
        <t-menu-item value="1-3">子菜单1-3</t-menu-item>
      </t-submenu>
      <t-submenu value="2">
        <template #title>
          <span>菜单2</span>
        </template>
        <t-menu-item value="2-1">子菜单2-1</t-menu-item>
        <t-menu-item value="2-2">子菜单2-2</t-menu-item>
        <t-menu-item value="2-3">子菜单2-3</t-menu-item>
      </t-submenu>
      <template #operations>
        <div class="t-demo-menu--dark">
          <t-button variant="text" shape="square">
            <search-icon slot="icon" />
          </t-button>
          <t-button variant="text" shape="square">
            <mail-icon slot="icon" />
          </t-button>
          <t-button variant="text" shape="square">
            <user-icon slot="icon" />
          </t-button>
          <t-button variant="text" shape="square">
            <ellipsis-icon slot="icon" />
          </t-button>
        </div>
      </template>
    </t-head-menu>
  </div>
</template>

<script>
import {
  SearchIcon, MailIcon, UserIcon, EllipsisIcon,
} from 'tdesign-icons-vue';

export default {
  components: {
    SearchIcon,
    MailIcon,
    UserIcon,
    EllipsisIcon,
  },
  data() {
    return {
      expanded: ['1'],
      expanded2: ['1'],
    };
  },
};
</script>
<style lang="less" scoped>
.t-menu__operations {
  .t-button {
    margin-left: 8px;
  }
}

.t-demo-menu--dark {
  .t-button {
    color: #fff;

    &:hover {
      background-color: #4b4b4b;
      border-color: transparent;
      --ripple-color: #383838;
    }
  }
}
</style>

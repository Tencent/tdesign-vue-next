<template>
  <t-head-menu @change="changeHandler" theme="dark" :value="active">
    <template #logo>
      <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
    </template>
    <t-menu-item :value="`${index + 1}`" v-for="(menu, index) in menus" :key="index">
      {{ menu.title }}
      <t-submenu>
        <t-menu-item
          v-for="(cMenu, cIndex) in menu.children"
          :key="`${index}-${cIndex}`"
          :value="`${index + 1}-${cIndex + 1}`"
        >
          {{ cMenu.title }}
        </t-menu-item>
      </t-submenu>
    </t-menu-item>
    <t-menu-item value="4" :disabled="true">菜单4</t-menu-item>
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
      active: '2-1',
      menus: [
        {
          title: '菜单1',
          children: [
            {
              title: '子菜单1-1',
            },
            {
              title: '子菜单1-2',
            },
            {
              title: '子菜单1-3',
            },
          ],
        },
        {
          title: '菜单2',
          children: [
            {
              title: '子菜单2-1',
            },
            {
              title: '子菜单2-2',
            },
            {
              title: '子菜单2-3',
            },
          ],
        },
        {
          title: '菜单3',
          children: [
            {
              title: '子菜单3-1',
            },
            {
              title: '子菜单3-2',
            },
            {
              title: '子菜单3-3',
            },
          ],
        },
      ],
    };
  },
  methods: {
    changeHandler(activeState) {
      this.active = activeState;
    },
  },
};
</script>
<style lang="less" scoped>
.t-menu__operations {
  .t-button {
    margin-left: 8px;
  }
}
</style>

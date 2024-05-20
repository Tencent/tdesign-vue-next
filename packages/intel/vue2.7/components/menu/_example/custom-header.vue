<template>
  <t-head-menu theme="dark" defaultValue="item2">
    <t-menu-item value="item1">菜单1</t-menu-item>
    <t-menu-item value="item2">菜单2</t-menu-item>
    <t-menu-item value="item3">菜单3</t-menu-item>
    <t-menu-item value="item4" :disabled="true">禁用菜单</t-menu-item>
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

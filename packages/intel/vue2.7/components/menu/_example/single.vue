<template>
  <div>
    <t-head-menu theme="light" v-model="menu1Value" @change="changeHandler">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" />
      </template>
      <t-menu-item value="item1">菜单1</t-menu-item>
      <t-menu-item value="item2">菜单2</t-menu-item>
      <t-menu-item value="item4" :disabled="true">禁用菜单</t-menu-item>
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

    <br />

    <t-head-menu theme="dark" v-model="menu2Value" height="120px">
      <img slot="logo" height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
      <t-menu-item value="item1">菜单1</t-menu-item>
      <t-menu-item value="item2">菜单2</t-menu-item>
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
      menu1Value: 'item2',
      menu2Value: 'item1',
    };
  },
  methods: {
    changeHandler(active) {
      console.log('change', active);
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

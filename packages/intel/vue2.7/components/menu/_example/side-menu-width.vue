<template>
  <div class="wrapper">
    <t-menu defaultValue="item2" width="200px" height="550px" style="margin-right: 20px">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" />
      </template>
      <t-menu-item value="item1">仪表盘</t-menu-item>
      <t-menu-item value="item2">信息区</t-menu-item>
      <t-menu-item value="item3">视频区</t-menu-item>
      <t-menu-item value="item4">资源区</t-menu-item>
    </t-menu>

    <t-menu defaultValue="item2" :collapsed="collapsed" :width="['300px', 150]" height="550px">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" />
      </template>
      <t-menu-item value="item1">
        <template #icon>
          <icon name="dashboard" />
        </template>
        仪表盘
      </t-menu-item>
      <t-menu-item value="2">
        <template #icon>
          <icon name="mail" />
        </template>
        信息区
      </t-menu-item>
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
          <icon name="view-list" />
        </t-button>
      </template>
    </t-menu>
  </div>
</template>

<script>
import { Icon } from 'tdesign-icons-vue';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

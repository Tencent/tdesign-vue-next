<template>
  <div class="box">
    <t-menu
      theme="light"
      value="item1"
      style="margin-right: 50px"
      height="550px"
      @change="changeHandler"
    >
      <template #logo>
        <img
          width="136"
          class="t-menu__logo--center"
          src="https://www.tencent.com/img/index/menu_logo_hover.png"
          alt="logo"
        >
      </template>
      <t-menu-item value="item1">
        仪表盘
      </t-menu-item>
      <t-menu-item value="item2">
        资源列表
      </t-menu-item>
      <t-menu-item value="item3">
        根目录
      </t-menu-item>
      <t-menu-item
        value="item4"
        :disabled="true"
      >
        调度平台
      </t-menu-item>
      <t-menu-item value="item5">
        精准监控
      </t-menu-item>
      <t-menu-item value="item6">
        消息区
      </t-menu-item>
      <t-menu-item value="item7">
        个人中心
      </t-menu-item>
      <t-menu-item value="item8">
        视频区
      </t-menu-item>
      <t-menu-item value="item9">
        资源编辑
      </t-menu-item>
    </t-menu>

    <t-menu
      theme="light"
      default-value="dashboard"
      style="margin-right: 50px"
      height="550px"
    >
      <template #logo>
        <img
          width="136"
          class="t-menu__logo--center"
          src="https://www.tencent.com/img/index/menu_logo_hover.png"
          alt="logo"
        >
      </template>
      <t-menu-item value="dashboard">
        <template #icon>
          <t-icon name="dashboard" />
        </template>
        仪表盘
      </t-menu-item>
      <t-menu-item value="resource">
        <template #icon>
          <t-icon name="resources-list" />
        </template>
        资源列表
      </t-menu-item>
      <t-menu-item value="root">
        <template #icon>
          <t-icon name="root-list" />
        </template>
        根目录
      </t-menu-item>
      <t-menu-item value="control-platform">
        <template #icon>
          <t-icon name="control-platform" />
        </template>
        调度平台
      </t-menu-item>
      <t-menu-item value="precise-monitor">
        <template #icon>
          <t-icon name="precise-monitor" />
        </template>
        精准监控
      </t-menu-item>
      <t-menu-item value="mail">
        <template #icon>
          <t-icon name="mail" />
        </template>
        消息区
      </t-menu-item>
      <t-menu-item value="user-circle">
        <template #icon>
          <t-icon name="user-circle" />
        </template>
        个人中心
      </t-menu-item>
      <t-menu-item value="play-circle">
        <template #icon>
          <t-icon name="play-circle" />
        </template>
        视频区
      </t-menu-item>
      <t-menu-item value="edit1">
        <template #icon>
          <t-icon name="edit-1" />
        </template>
        资源编辑
      </t-menu-item>
    </t-menu>

    <t-menu
      theme="dark"
      value="dashboard"
      height="550px"
    >
      <template #logo>
        <img
          width="136"
          class="t-menu__logo--center"
          src="https://www.tencent.com/img/index/menu_logo.png"
          alt="logo"
        >
      </template>
      <t-menu-item value="dashboard">
        <template #icon>
          <t-icon name="dashboard" />
        </template>
        仪表盘
      </t-menu-item>
      <t-menu-item value="resource">
        <template #icon>
          <t-icon name="resources-list" />
        </template>
        资源列表
      </t-menu-item>
      <t-menu-item value="root">
        <template #icon>
          <t-icon name="root-list" />
        </template>
        根目录
      </t-menu-item>
      <t-menu-item value="control-platform">
        <template #icon>
          <t-icon name="control-platform" />
        </template>
        调度平台
      </t-menu-item>
      <t-menu-item value="precise-monitor">
        <template #icon>
          <t-icon name="precise-monitor" />
        </template>
        精准监控
      </t-menu-item>
      <t-menu-item value="mail">
        <template #icon>
          <t-icon name="mail" />
        </template>
        消息区
      </t-menu-item>
      <t-menu-item value="user-circle">
        <template #icon>
          <t-icon name="user-circle" />
        </template>
        个人中心
      </t-menu-item>
      <t-menu-item value="play-circle">
        <template #icon>
          <t-icon name="play-circle" />
        </template>
        视频区
      </t-menu-item>
      <t-menu-item value="edit1">
        <template #icon>
          <t-icon name="edit-1" />
        </template>
        资源编辑
      </t-menu-item>
    </t-menu>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      changeHandler(active) {
        console.log('change', active);
      },
    };
  },
});
</script>

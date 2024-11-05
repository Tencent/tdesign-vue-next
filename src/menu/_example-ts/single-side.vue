<template>
  <div class="box">
    <t-menu theme="light" default-value="item1" style="margin-right: 40px" @change="changeHandler">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" />
      </template>
      <t-menu-item value="item1"> 仪表盘 </t-menu-item>
      <t-menu-item value="item2"> 资源列表 </t-menu-item>
      <t-menu-item value="item3"> 根目录 </t-menu-item>
      <t-menu-item value="item4" :disabled="true"> 调度平台 </t-menu-item>
      <t-menu-item value="item5"> 精准监控 </t-menu-item>
      <t-menu-item value="item6"> 消息区 </t-menu-item>
      <t-menu-item value="item7"> 个人中心 </t-menu-item>
      <t-menu-item value="item8"> 视频区 </t-menu-item>
      <t-menu-item value="item9"> 资源编辑 </t-menu-item>
    </t-menu>

    <t-menu theme="light" default-value="dashboard" style="margin-right: 40px">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" />
      </template>
      <t-menu-item value="dashboard">
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

    <t-menu theme="dark" default-value="dashboard">
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
      </template>
      <t-menu-item value="dashboard">
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

<script lang="ts" setup>
import { MenuProps } from 'tdesign-vue-next';
const changeHandler: MenuProps['onChange'] = (active) => {
  console.log('change', active);
};
</script>

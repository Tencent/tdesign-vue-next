<template>
  <div class="tdesign-demo-item--layout">
    <t-layout>
      <t-aside>
        <t-menu theme="light" value="dashboard" style="margin-right: 50px" height="550px">
          <img
            slot="logo"
            width="136"
            class="t-menu__logo--center"
            src="https://www.tencent.com/img/index/menu_logo_hover.png"
            alt="logo"
          />
          <t-menu-item value="dashboard"> <icon slot="icon" name="dashboard" />仪表盘 </t-menu-item>
          <t-menu-item value="resource"> <icon slot="icon" name="server" />资源列表 </t-menu-item>
          <t-menu-item value="root"> <icon slot="icon" name="root-list" />根目录 </t-menu-item>
          <t-menu-item value="control-platform"> <icon slot="icon" name="control-platform" />调度平台 </t-menu-item>
          <t-menu-item value="precise-monitor"> <icon slot="icon" name="precise-monitor" />精准监控 </t-menu-item>
          <t-menu-item value="mail"> <icon slot="icon" name="mail" />消息区 </t-menu-item>
          <t-menu-item value="user-circle"> <icon slot="icon" name="user-circle" />个人中心 </t-menu-item>
          <t-menu-item value="play-circle"> <icon slot="icon" name="play-circle" />视频区 </t-menu-item>
          <t-menu-item value="edit1"> <icon slot="icon" name="edit-1" />资源编辑 </t-menu-item>
        </t-menu>
      </t-aside>
      <t-layout>
        <t-content>
          <div>Content</div>
        </t-content>
        <t-footer>Copyright @ 2019-{{ new Date().getFullYear() }} Tencent. All Rights Reserved</t-footer>
      </t-layout>
    </t-layout>
  </div>
</template>
<script>
import { Icon } from 'tdesign-icons-vue';

export default {
  components: {
    Icon,
  },
};
</script>

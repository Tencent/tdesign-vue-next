<template>
  <t-config-provider :global-config="globalConfig">
    <t-space>
      <t-button @click="dialogVisible = true">打开对话框</t-button>
      <t-button @click="drawerVisible = true">打开抽屉</t-button>
      <t-popup content="浮层统一挂载到 body">
        <t-button variant="outline">悬浮显示 Popup</t-button>
      </t-popup>
      <t-image-viewer :images="images">
        <template #trigger="{ open }">
          <t-button @click="open">预览图片</t-button>
        </template>
      </t-image-viewer>
    </t-space>
    <t-dialog v-model:visible="dialogVisible" header="全局挂载配置" :on-confirm="() => (dialogVisible = false)">
      Dialog、Drawer、Popup 和 ImageViewer 共用全局 attach 配置，也可以通过组件的 attach 属性单独覆盖。
    </t-dialog>
    <t-drawer v-model:visible="drawerVisible" header="全局挂载配置" :on-confirm="() => (drawerVisible = false)">
      Drawer 挂载到 body。
    </t-drawer>
  </t-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { GlobalConfigProvider } from 'tdesign-vue-next';

const globalConfig: GlobalConfigProvider = { attach: 'body' };
const dialogVisible = ref(false);
const drawerVisible = ref(false);
const images = ['https://tdesign.gtimg.com/demo/demo-image-1.png'];
</script>

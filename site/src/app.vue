<template>
  <t-config-provider :global-config="globalConfig">
    <router-view />
  </t-config-provider>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import cnConfig from 'tdesign-vue-next/es/locale/zh_CN';
import enConfig from 'tdesign-vue-next/es/locale/en_US';
import { getLang } from 'tdesign-site-components';

const globalConfig = ref(cnConfig);

onMounted(() => {
  const lang = getLang();
  globalConfig.value = lang === 'en' ? enConfig : cnConfig;
});
</script>

<style lang="less">
div[slot='action'] {
  display: inline-flex;
  column-gap: 8px;
}

.action-online {
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: all 0.2s linear;
  cursor: pointer;
  border-radius: 3px;
  color: var(--text-secondary);

  &:hover {
    color: var(--text-primary);
    background-color: var(--bg-color-demo-hover, rgb(243, 243, 243));
  }
}

#webchat-sdk-iframe {
  z-index: 99999;
}
.webchat-sdk-toolbar {
  bottom: 150px !important;
}
</style>

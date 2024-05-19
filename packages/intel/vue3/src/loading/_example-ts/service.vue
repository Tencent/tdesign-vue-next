<template>
  <t-space direction="vertical">
    <div id="loading-service-demo" ref="content" class="loading-service-demo">Loading 挂载容器</div>

    <t-space>
      <t-button class="t-loading__btn" size="small" :disabled="attachLoading" @click="showAttach">
        函数方式加载（局部）
      </t-button>
      <t-button size="small" @click="showFullScreen">函数方式加载（全屏）</t-button>
      <t-button size="small" @click="showFullScrollScreen">函数方式加载（全屏-滚动穿透）</t-button>
    </t-space>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LoadingPlugin, ButtonProps } from 'tdesign-vue-next';

const content = ref(null);
const attachLoading = ref(false);

// 函数式：局部加载
const showAttach: ButtonProps['onClick'] = () => {
  const loadingAttachInstance = LoadingPlugin({
    attach: () => content.value, // 等于 attach: '#loading-service-demo'
    showOverlay: true,
    size: '20px',
  });
  attachLoading.value = true;
  const timer = setTimeout(() => {
    loadingAttachInstance.hide();
    attachLoading.value = false;
    clearTimeout(timer);
  }, 1000);
};
// 函数式：全屏加载，防止滚动穿透
const showFullScreen: ButtonProps['onClick'] = () => {
  LoadingPlugin(true);
  const timer = setTimeout(() => {
    LoadingPlugin(false);
    clearTimeout(timer);
  }, 10000);
};
// 函数式：全屏加载，允许滚动穿透
const showFullScrollScreen: ButtonProps['onClick'] = () => {
  const instance = LoadingPlugin({
    fullscreen: true,
    attach: 'body',
    preventScrollThrough: false,
  });
  const timer = setTimeout(() => {
    instance.hide();
    clearTimeout(timer);
  }, 1000);
};
</script>

<style scoped>
.loading-service-demo {
  position: relative;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px var(--component-border, #eee) solid;
}
</style>

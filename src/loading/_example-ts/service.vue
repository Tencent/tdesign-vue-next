<template>
  <t-space direction="vertical">
    <div id="loading-service-demo" ref="content" class="loading-service-demo">Loading 挂载容器</div>

    <p>LoadingPlugin(true)</p>
    <p>LoadingPlugin({ attach: '#loading-service-demo', showOverlay: true })</p>

    <t-space>
      <t-button class="t-loading__btn" size="small" :disabled="attachLoading1" @click="showAttach1">
        函数方式加载（局部）
      </t-button>
      <t-button size="small" @click="showFullScreen1">函数方式加载（全屏）</t-button>
      <t-button size="small" @click="showFullScrollScreen1">函数方式加载（全屏-滚动穿透）</t-button>
    </t-space>

    <p>LoadingPlugin(true)</p>
    <p>LoadingPlugin({ attach: '#loading-service-demo', showOverlay: true })</p>

    <t-space>
      <t-button class="t-loading__btn" size="small" :disabled="attachLoading2" @click="showAttach2">
        插件方式加载（局部）
      </t-button>
      <t-button size="small" @click="showFullScreen2">插件方式加载（全屏）</t-button>
      <t-button size="small" @click="showFullScrollScreen2">插件方式加载（全屏-滚动穿透）</t-button>
    </t-space>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LoadingPlugin, ButtonProps } from 'tdesign-vue-next';
const content = ref(null);
const attachLoading = ref(false);
const attachLoading1 = ref(false);
const attachLoading2 = ref(false);
// 插件式：局部加载，局部加载模式添加 attach="body" 无效
const showAttach2: ButtonProps['onClick'] = () => {
  const loadingAttachInstance = LoadingPlugin({
    attach: '#loading-service-demo',
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
// 插件式：全屏加载，默认防止滚动穿透
const showFullScreen2: ButtonProps['onClick'] = () => {
  LoadingPlugin(true);
  const timer = setTimeout(() => {
    LoadingPlugin(false);
    clearTimeout(timer);
  }, 10000);
};
// 插件式：全屏加载，允许滚动穿透
const showFullScrollScreen2: ButtonProps['onClick'] = () => {
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

// 函数式：局部加载
const showAttach1: ButtonProps['onClick'] = () => {
  const loadingAttachInstance = LoadingPlugin({
    attach: () => content.value,
    showOverlay: true,
    size: '20px',
  });
  attachLoading1.value = true;
  const timer = setTimeout(() => {
    loadingAttachInstance.hide();
    attachLoading1.value = false;
    clearTimeout(timer);
  }, 1000);
};

// 函数式：全屏加载，防止滚动穿透
const showFullScreen1: ButtonProps['onClick'] = () => {
  LoadingPlugin(true);
  const timer = setTimeout(() => {
    LoadingPlugin(false);
    clearTimeout(timer);
  }, 1000);
};

// 函数式：全屏加载，允许滚动穿透
const showFullScrollScreen1: ButtonProps['onClick'] = () => {
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

<template>
  <t-space direction="vertical">
    <div id="loading-service-demo" ref="content" class="loading-service-demo">Loading 挂载容器</div>

    <p>this.$loading({ attach: '#loading-service-demo', showOverlay: true })</p>
    <p>this.$loading(true)</p>
    <p>this.$loading({ fullscreen: true, attach: 'body', preventScrollThrough: false })</p>

    <t-space>
      <t-button @click="showAttach1" size="small" :disabled="attachLoading">插件方式加载（局部）</t-button>
      <t-button @click="showFullScreen1" size="small">插件方式加载（全屏）</t-button>
      <t-button @click="showFullScrollScreen1" size="small">插件方式加载（全屏-滚动穿透）</t-button>
    </t-space>

    <p>LoadingPlugin({ attach: '#loading-service-demo', showOverlay: true })</p>
    <p>LoadingPlugin(true)</p>
    <p>LoadingPlugin({ fullscreen: true, attach: 'body', preventScrollThrough: false })</p>

    <t-space>
      <t-button @click="showAttach2" size="small" :disabled="attachLoading">函数方式加载（局部）</t-button>
      <t-button @click="showFullScreen2" size="small">函数方式加载（全屏）</t-button>
      <t-button @click="showFullScrollScreen2" size="small">函数方式加载（全屏-滚动穿透）</t-button>
    </t-space>
  </t-space>
</template>
<script>
import { LoadingPlugin } from 'tdesign-vue';

export default {
  name: 'LoadingPlugin',
  data() {
    return {
      attachLoading: false,
    };
  },
  methods: {
    // 插件式：局部加载，局部加载模式添加 attach="body" 无效
    showAttach1() {
      const loadingAttachInstance = this.$loading({
        attach: '#loading-service-demo',
        showOverlay: true,
        size: '20px',
      });
      this.attachLoading = true;
      const timer = setTimeout(() => {
        loadingAttachInstance.hide();
        this.attachLoading = false;
        clearTimeout(timer);
      }, 1000);
    },
    // 插件式：全屏加载，默认防止滚动穿透
    showFullScreen1() {
      this.$loading(true);
      const timer = setTimeout(() => {
        this.$loading(false);
        clearTimeout(timer);
      }, 1000);
    },
    // 插件式：全屏加载，允许滚动穿透
    showFullScrollScreen1() {
      const instance = this.$loading({
        fullscreen: true,
        attach: 'body',
        preventScrollThrough: false,
      });
      const timer = setTimeout(() => {
        instance.hide();
        clearTimeout(timer);
      }, 1000);
    },

    // 函数式：局部加载
    showAttach2() {
      const loadingAttachInstance = LoadingPlugin({
        attach: () => this.$refs.content,
        showOverlay: true,
        size: '20px',
      });
      this.attachLoading = true;
      const timer = setTimeout(() => {
        loadingAttachInstance.hide();
        this.attachLoading = false;
        clearTimeout(timer);
      }, 1000);
    },
    // 函数式：全屏加载，防止滚动穿透
    showFullScreen2() {
      LoadingPlugin(true);
      const timer = setTimeout(() => {
        LoadingPlugin(false);
        clearTimeout(timer);
      }, 1000);
    },
    // 函数式：全屏加载，允许滚动穿透
    showFullScrollScreen2() {
      const instance = LoadingPlugin({
        fullscreen: true,
        attach: 'body',
        preventScrollThrough: false,
      });
      const timer = setTimeout(() => {
        instance.hide();
        clearTimeout(timer);
      }, 1000);
    },
  },
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

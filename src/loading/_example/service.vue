<template>
  <div class="tdesign-demo-block-column">
    <div id="loading-service-demo" ref="content" class="loading-service-demo">Loading 挂载容器</div>

    <p>this.$loading(true)</p>
    <p>this.$loading({ attach: '#loading-service-demo', showOverlay: true })</p>

    <div class="tdesign-demo-block-row">
      <t-button class="t-loading__btn" size="small" :disabled="attachLoading" @click="showAttach1">
        插件方式加载（局部）
      </t-button>
      <t-button size="small" @click="showFullScreen1">插件方式加载（全屏）</t-button>
      <t-button size="small" @click="showFullScrollScreen1">插件方式加载（全屏-滚动穿透）</t-button>
    </div>

    <p>LoadingPlugin(true)</p>
    <p>LoadingPlugin({ attach: '#loading-service-demo', showOverlay: true })</p>

    <div class="tdesign-demo-block-row">
      <t-button class="t-loading__btn" size="small" :disabled="attachLoading" @click="showAttach2"
        >函数方式加载（局部）</t-button
      >
      <t-button size="small" @click="showFullScreen2">函数方式加载（全屏）</t-button>
      <t-button size="small" @click="showFullScrollScreen2">函数方式加载（全屏-滚动穿透）</t-button>
    </div>
  </div>
</template>
<script>
import { LoadingPlugin } from 'tdesign-vue-next';

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
      }, 10000);
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

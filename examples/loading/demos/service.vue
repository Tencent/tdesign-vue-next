<template>
  <div class="tdesign-demo-block-column">
    <div id="loading-service-demo" ref="content" class="loading-service-demo">我是service的容器</div>

    <p>this.$loading(true)</p>
    <p>this.$loading({ attach: '#loading-service-demo', showOverlay: true })</p>

    <div class="tdesign-demo-block-row">
      <t-button size="small" @click="showFullScreen1"> 服务方式加载（全屏） </t-button>
      <t-button size="small" :disabled="attachLoading" @click="showAttach1"> 服务方式加载（局部） </t-button>
    </div>

    <p>LoadingPlugin(true)</p>
    <p>LoadingPlugin({ attach: '#loading-service-demo', showOverlay: true })</p>

    <div class="tdesign-demo-block-row">
      <t-button size="small" @click="showFullScreen2"> 函数方式加载（全屏） </t-button>
      <t-button class="t-loading__btn" size="small" :disabled="attachLoading" @click="showAttach2">
        函数方式加载（局部）
      </t-button>
    </div>
  </div>
</template>
<script>
import { LoadingPlugin } from '@tencent/tdesign-vue-next';

export default {
  name: 'LoadingPlugin',
  data() {
    return {
      attachLoading: false,
    };
  },
  methods: {
    showFullScreen1() {
      this.$loading(true);
      const timer = setTimeout(() => {
        this.$loading(false);
        clearTimeout(timer);
      }, 1000);
    },
    showAttach1() {
      const loadingAttachInstance = this.$loading({
        attach: '#loading-service-demo',
        showOverlay: true,
      });
      this.attachLoading = true;
      const timer = setTimeout(() => {
        loadingAttachInstance.hide();
        this.attachLoading = false;
        clearTimeout(timer);
      }, 1000);
    },
    showFullScreen2() {
      LoadingPlugin(true);
      const timer = setTimeout(() => {
        LoadingPlugin(false);
        clearTimeout(timer);
      }, 1000);
    },
    showAttach2() {
      const loadingAttachInstance = LoadingPlugin({
        attach: () => this.$refs.content,
        showOverlay: true,
      });
      this.attachLoading = true;
      const timer = setTimeout(() => {
        loadingAttachInstance.hide();
        this.attachLoading = false;
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

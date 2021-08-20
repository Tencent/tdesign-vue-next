<template>
  <div>
    <div id="loading-service-demo" ref='content' class="loading-service-demo">我是service的容器</div>
    <br>
    <p>this.$loading(true)</p>
    <p>this.$loading({ attach: '#loading-service-demo', showOverlay: true })</p>
    <br>
    <t-button @click="showFullScreen1" size="small">服务方式加载（全屏）</t-button>
    <t-button @click="showAttach1" size="small" :disabled="attachLoading">服务方式加载（局部）</t-button>

    <br><br>
    <p>LoadingPlugin(true)</p>
    <p>LoadingPlugin({ attach: '#loading-service-demo', showOverlay: true })</p>
    <br>
    <t-button @click="showFullScreen2" size="small">服务方式加载（全屏）</t-button>
    <t-button @click="showAttach2" size="small" :disabled="attachLoading">服务方式加载（局部）</t-button>
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
  border: 1px #fafafa solid;
  text-align: center;
  padding: 12px;
  margin-bottom: 12px;
}

div .t-button + .t-button {
  margin-left: 24px;
}
</style>

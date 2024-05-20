<template>
  <t-space direction="vertical">
    <t-space>
      <t-button @click="loadingData(0)" size="small">无 delay 属性快速加载数据（会闪屏）</t-button>
      <t-button @click="loadingData(500)" size="small">有 delay 属性快速加载数据（无闪屏）</t-button>
    </t-space>

    <t-skeleton :loading="loading" :delay="delay">
      <div class="t-skeleton-demo-paragraph">
        <p>
          骨架屏组件，是指当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。
          一方面让用户对页面有一定的心理预期，另一方面可以改善长期停留在空白屏给用户带来的枯燥和不适感。它可以为用户提供更好视觉效果和使用体验。
        </p>
      </div>
    </t-skeleton>
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      delay: 500,
    };
  },
  methods: {
    loadingData(delay) {
      this.delay = delay;
      this.loading = true;
      const timer = setTimeout(() => {
        this.loading = false;
        clearTimeout(timer);
      }, 100);
    },
  },
};
</script>

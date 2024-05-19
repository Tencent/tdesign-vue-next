<template>
  <t-space>
    <t-tooltip default-visible :content="`提示在 ${count} 秒后消失`" :duration="5000" :key="reset">
      <t-button variant="text" disabled>定时消失</t-button>
    </t-tooltip>
    <t-button variant="outline" @click="setTimer" v-if="!count">点击再次查看</t-button>
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      reset: true,
    };
  },
  created() {
    this.setTimer();
  },
  methods: {
    setTimer() {
      this.reset = !this.reset;
      this.count = 5;
      const timer = setInterval(() => {
        this.count -= 1;
        if (this.count <= 0) {
          clearInterval(timer);
        }
      }, 1000);
      this.$on('hook:beforeDestroy', () => {
        clearInterval(timer);
      });
    },
  },
};
</script>

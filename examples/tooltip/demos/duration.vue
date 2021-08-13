<template>
  <t-tooltip :visible="true" content="文字提示默认显示 5 秒消失" :duration="5000">
    <t-button variant="outline">
      {{ count ? `提示在 ${count} 秒后消失` : '悬浮再次查看' }}
    </t-button>
  </t-tooltip>
</template>
<script>
export default {
  data() {
    return {
      count: 5,
    };
  },
  created() {
    const timer = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  },
};
</script>

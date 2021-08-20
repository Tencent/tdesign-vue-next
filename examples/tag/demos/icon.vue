<template>
  <div class="tdesign-tag-icon">
    <t-tag :icon="renderDiscountIcon">默认标签</t-tag>
  </div>
</template>

<script>
import TIconDiscount from '@tencent/tdesign-vue/lib/icon/discount';

export default {
  methods: {
    renderDiscountIcon() {
      return <TIconDiscount />;
    },
  },
};
</script>

<style lang="less">
</style>

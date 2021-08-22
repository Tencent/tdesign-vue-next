<template>
  <div class="tdesign-tag-icon">
    <t-tag :icon="renderDiscountIcon">默认标签</t-tag>
  </div>
</template>

<script lang="jsx">
import TIconDiscount from '@tencent/tdesign-vue-next/lib/icon/discount';

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
